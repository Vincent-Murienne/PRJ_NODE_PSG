import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Récupérer toutes les informations du club
export const getAllClubs = async (req: Request, res: Response): Promise<void> => {
    try {
        const [clubs] = await db.query<RowDataPacket[]>('SELECT * FROM club');
        res.status(200).json(clubs.shift());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des clubs.' });
    }
};

// Mettre à jour la présentation du club
export const updateClubPresentation = async (req: Request, res: Response): Promise<void> => {
    const clubId = req.params.id_club;
    const { presentation } = req.body;

    if (!presentation) {
        res.status(400).json({ message: 'La présentation est requise.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE club SET presentation = ? WHERE id_club = ?',
            [presentation, clubId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Présentation mise à jour avec succès.' });
        } else {
            res.status(404).json({ message: 'Club non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la présentation.' });
    }
};

// Mettre à jour toutes les informations du club
export const updateClubDetails = async (req: Request, res: Response): Promise<void> => {
    const clubId = req.params.id_club;
    const { presentation, histoire } = req.body;

    if (!presentation || !histoire) {
        res.status(400).json({ message: 'La présentation et/ou l\'histoire sont requises.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE club SET presentation = ?, histoire = ? WHERE id_club = ?',
            [presentation, histoire, clubId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Présentation et histoire mises à jour avec succès.' });
        } else {
            res.status(404).json({ message: 'Club non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du club.' });
    }
};
