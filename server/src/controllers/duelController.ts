import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Récupérer tous les duels
export const getAllDuels = async (req: Request, res: Response): Promise<void> => {
    try {
        const [duels] = await db.query<RowDataPacket[]>('SELECT * FROM duel');
        res.status(200).json(duels);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des duels.' });
    }
};

// Ajouter un nouveau duel
export const addDuel = async (req: Request, res: Response): Promise<void> => {
    const { date_match, lieu_match, id_adversaire } = req.body;

    if (!date_match || !lieu_match || !id_adversaire) {
        res.status(400).json({ message: 'Tous les champs sont requis.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO duel (date_match, lieu_match, id_adversaire) VALUES (?, ?, ?)', 
            [date_match, lieu_match, id_adversaire]
        );
        res.status(201).json({ message: 'Duel ajouté avec succès.', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du duel.' });
    }
};

// Mettre à jour un duel
export const updateDuel = async (req: Request, res: Response): Promise<void> => {
    const matchId = req.params.id;
    const { date_match, lieu_match, id_adversaire } = req.body;

    if (!date_match || !lieu_match || !id_adversaire) {
        res.status(400).json({ message: 'Tous les champs sont requis.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE duel SET date_match = ?, lieu_match = ?, id_adversaire = ? WHERE id_match = ?', 
            [date_match, lieu_match, id_adversaire, matchId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Duel mis à jour avec succès.' });
        } else {
            res.status(404).json({ message: 'Duel non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du duel.' });
    }
};

// Supprimer un duel
export const deleteDuel = async (req: Request, res: Response): Promise<void> => {
    const matchId = req.params.id;

    try {
        const [result] = await db.query<ResultSetHeader>('DELETE FROM duel WHERE id_match = ?', [matchId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Duel supprimé avec succès.' });
        } else {
            res.status(404).json({ message: 'Duel non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du duel.' });
    }
};
