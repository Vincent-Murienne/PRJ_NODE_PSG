import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Récupérer tous les partenaires
export const getAllPartenaires = async (req: Request, res: Response): Promise<void> => {
    try {
        const [partenaires] = await db.query<RowDataPacket[]>('SELECT * FROM partenaire');
        res.status(200).json(partenaires);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des partenaires.' });
    }
};

// Récupérer un partenaire
export const getPartenaireByID = async (req: Request, res: Response): Promise<void> => {
    const id_partenaire = req.params.id_partenaire;
    try {
        const [partenaire] = await db.query<RowDataPacket[]>('SELECT * FROM partenaire WHERE id_partenaire = ?', [id_partenaire]);
        res.status(200).json(partenaire);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération du partenaire.' });
    }
};

// Ajouter un nouveau partenaire
export const addPartenaire = async (req: Request, res: Response): Promise<void> => {
    const { logo, url } = req.body;

    if (!logo || !url) {
        res.status(400).json({ message: 'La logo et l\'URL sont requises.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>('INSERT INTO partenaire (logo, url) VALUES (?, ?)', [logo, url]);
        res.status(201).json({ message: 'Partenaire ajouté avec succès.', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du partenaire.' });
    }
};

// Mettre à jour un partenaire
export const updatePartenaire = async (req: Request, res: Response): Promise<void> => {
    const partenaireId = req.params.id_partenaire;
    const { logo, url } = req.body;

    if (!logo && !url) {
        res.status(400).json({ message: 'Au moins une des informations (logo ou URL) est requise.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE partenaire SET logo = ?, url = ? WHERE id_partenaire = ?', 
            [logo, url, partenaireId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Partenaire mis à jour avec succès.' });
        } else {
            res.status(404).json({ message: 'Partenaire non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du partenaire.' });
    }
};


// Supprimer un partenaire
export const deletePartenaire = async (req: Request, res: Response): Promise<void> => {
    const partenaireId = req.params.id_partenaire;

    try {
        const [result] = await db.query<ResultSetHeader>('DELETE FROM partenaire WHERE id_partenaire = ?', [partenaireId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Partenaire supprimé avec succès.' });
        } else {
            res.status(404).json({ message: 'Partenaire non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du partenaire.' });
    }
};
