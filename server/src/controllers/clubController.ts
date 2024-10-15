import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const getAllClubs = async (req: Request, res: Response): Promise<void> => {
    try {
        const [clubs] = await db.query<RowDataPacket[]>('SELECT * FROM club');
        res.status(200).json(clubs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des clubs.' });
    }
};

export const updatePresentation = async (req: Request, res: Response): Promise<void> => {
    const clubId = req.params.id;
    const { presentation } = req.body;

    if (!presentation) {
        res.status(400).json({ message: 'La présentation est requise.' });
        return;
    }
    try {
        // Assurez-vous que le type de résultat est correctement défini
        const [result] = await db.query<ResultSetHeader>('UPDATE club SET presentation = ? WHERE id = ?', [presentation, clubId]);

        // Vérifiez si affectedRows est disponible sur result
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
