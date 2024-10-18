import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Récupérer tous les matchs
export const getAllDuels = async (req: Request, res: Response): Promise<void> => {
    try {
        const [duels] = await db.query<RowDataPacket[]>(
        `SELECT *
        FROM duel`);
        res.status(200).json(duels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des matchs.' });
    }
};

// Récupérer tous les matchs avec un score
export const getAllDuelsWithScore = async (req: Request, res: Response): Promise<void> => {
    try {
        const [duels] = await db.query<RowDataPacket[]>(
        `SELECT
            m.id_match, 
            m.date_match, 
            m.lieu_match, 
            adv.nom_adversaire, 
            sec.nom_section, 
            ms.score_equipe, 
            ms.score_adversaire
        FROM duel m
        JOIN adversaire adv ON adv.id_adversaire = m.id_adversaire
        JOIN section sec ON sec.id_section = m.id_section
        JOIN matchScore ms ON ms.id_matchscore = m.id_matchscore`);
        res.status(200).json(duels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des matchs.' });
    }
};

// Récupérer un seul match
export const getDuelByIDWithScore = async (req: Request, res: Response): Promise<void> => {
    const id_match = req.params.id_match;
    try {
        const [duel] = await db.query<RowDataPacket[]>(
        `SELECT
            m.id_match, 
            m.date_match, 
            m.lieu_match, 
            adv.nom_adversaire, 
            sec.nom_section, 
            ms.score_equipe, 
            ms.score_adversaire
        FROM duel m
        JOIN adversaire adv ON adv.id_adversaire = m.id_adversaire
        JOIN section sec ON sec.id_section = m.id_section
        JOIN matchScore ms ON ms.id_matchscore = m.id_matchscore
        WHERE m.id_match = ?`, [id_match]);
        res.status(200).json(duel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du match.' });
    }
};

// Récupérer le calendrier des 3 derniers matchs et des 3 prochains matchs par section
export const getCalendrier = async (req: Request, res: Response): Promise<void> => {
    const sectionId = req.params.id_section;

    try {
        const [matches] = await db.query<RowDataPacket[]>(
            `(
                SELECT
                    m.id_match,
                    adv.nom_adversaire, 
                    m.date_match, 
                    m.lieu_match, 
                    sec.nom_section, 
                    'passe' AS type_match
                FROM duel m
                JOIN section sec ON sec.id_section = m.id_section
                JOIN adversaire adv ON adv.id_adversaire = m.id_adversaire
                WHERE m.id_section = ?
                AND m.date_match <= NOW()
                ORDER BY m.date_match DESC
                LIMIT 3
            )
            UNION
            (
                SELECT
                    m.id_match, 
                    adv.nom_adversaire, 
                    m.date_match, 
                    m.lieu_match, 
                    sec.nom_section, 
                    'futur' AS type_match
                FROM duel m
                JOIN section sec ON sec.id_section = m.id_section
                JOIN adversaire adv ON adv.id_adversaire = m.id_adversaire
                WHERE m.id_section = ?
                AND m.date_match > NOW()
                ORDER BY m.date_match ASC
                LIMIT 3
            )
            `,
            [sectionId, sectionId]
        );

        if (matches.length > 0) {
            res.status(200).json(matches);
        } else {
            res.status(404).json({ message: 'Aucun match trouvé pour cette section.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du calendrier des matchs.' });
    }
};

// Ajouter un nouveau match
export const addDuel = async (req: Request, res: Response): Promise<void> => {
    const { date_match, lieu_match, id_adversaire, id_section, score_equipe, score_adversaire } = req.body;

    if (!date_match || !lieu_match || !id_adversaire || !id_section) {
        res.status(400).json({ message: 'Tous les champs sont requis.' });
        return;
    }

    try {
        await db.query('START TRANSACTION');

        const [scoreResult] = await db.query<ResultSetHeader>(
            'INSERT INTO matchScore (score_equipe, score_adversaire) VALUES (?, ?)',
            [score_equipe, score_adversaire]
        );
        const id_matchScore = scoreResult.insertId;

        const [matchResult] = await db.query<ResultSetHeader>(
            'INSERT INTO duel (date_match, lieu_match, id_adversaire, id_section, id_matchScore) VALUES (?, ?, ?, ?, ?)',
            [date_match, lieu_match, id_adversaire, id_section, id_matchScore]
        );

        const matchId = matchResult.insertId;
        await db.query('COMMIT');
        res.status(201).json({ message: 'Match et score ajoutés avec succès.', matchId });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du match et du score.' });
    }
};

// Mise à jour du match
export const updateDuel = async (req: Request, res: Response): Promise<void> => {
    const matchId = req.params.id_match;
    const { date_match, lieu_match, id_adversaire, id_section, score_equipe, score_adversaire } = req.body;

    if (!date_match || !lieu_match || !id_adversaire || !id_section) {
        res.status(400).json({ message: 'Tous les champs sont requis.' });
        return;
    }

    try {
        await db.query('START TRANSACTION');

        const [duelRows] = await db.query<RowDataPacket[]>(
            'SELECT id_matchScore FROM duel WHERE id_match = ?',
            [matchId]
        );

        if (duelRows.length === 0) {
            await db.query('ROLLBACK');
            res.status(404).json({ message: 'Match non trouvé.' });
            return;
        }

        const id_matchScore = duelRows[0].id_matchScore;

        await db.query(
            'UPDATE matchScore SET score_equipe = ?, score_adversaire = ? WHERE id_matchScore = ?',
            [score_equipe, score_adversaire, id_matchScore]
        );

        const [result] = await db.query<ResultSetHeader>(
            'UPDATE duel SET date_match = ?, lieu_match = ?, id_adversaire = ?, id_section = ? WHERE id_match = ?',
            [date_match, lieu_match, id_adversaire, id_section, matchId]
        );

        await db.query('COMMIT');

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Match et score mis à jour avec succès.' });
        } else {
            res.status(404).json({ message: 'Match non trouvé.' });
        }
    } catch (error) {
        await db.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du match et du score.' });
    }
};

// Mise à jour du score d'un match déjà joué
export const updateMatchScore = async (req: Request, res: Response): Promise<void> => {
    const matchId = req.params.id_match;
    const { score_equipe, score_adversaire } = req.body;

    if (score_equipe === undefined || score_adversaire === undefined) {
        res.status(400).json({ message: 'Les scores doivent être fournis.' });
        return;
    }

    try {
        // Vérifie si le match est déjà passé
        const [match] = await db.query<RowDataPacket[]>(
            `SELECT date_match FROM duel WHERE id_match = ? AND date_match <= NOW()`, 
            [matchId]
        );

        if (match.length === 0) {
            res.status(400).json({ message: 'Le match est soit inexistant, soit il est dans le futur.' });
            return;
        }

        // Met à jour les scores du match
        const [result] = await db.query<ResultSetHeader>(
            `UPDATE matchScore 
            SET score_equipe = ?, score_adversaire = ? 
            WHERE id_matchscore = (SELECT id_matchscore FROM duel WHERE id_match = ?)`,
            [score_equipe, score_adversaire, matchId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Scores mis à jour avec succès.' });
        } else {
            res.status(404).json({ message: 'Le score n\'a pas pu être mis à jour.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du score.' });
    }
};


// Supprimer un match
export const deleteDuel = async (req: Request, res: Response): Promise<void> => {
    const matchId = req.params.id_match;

    try {
        await db.query('START TRANSACTION');

        const [duelRows] = await db.query<RowDataPacket[]>(
            'SELECT id_matchScore FROM duel WHERE id_match = ?',
            [matchId]
        );

        if (duelRows.length === 0) {
            await db.query('ROLLBACK');
            res.status(404).json({ message: 'Match non trouvé.' });
            return;
        }

        const id_matchScore = duelRows[0].id_matchScore;

        await db.query('DELETE FROM duel WHERE id_match = ?', [matchId]);

        await db.query('DELETE FROM matchScore WHERE id_matchScore = ?', [id_matchScore]);

        await db.query('COMMIT');

        res.status(200).json({ message: 'Match et score supprimés avec succès.' });
    } catch (error) {
        await db.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du match et du score.' });
    }
};
