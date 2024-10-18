import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Récupérer toutes les actualités
export const getAllActualites = async (req: Request, res: Response): Promise<void> => {
    try {
        const [actualites] = await db.query<RowDataPacket[]>('SELECT * FROM actualite');
        res.status(200).json(actualites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des actualités.' });
    }
};

// Ajouter une nouvelle actualité
export const addActualite = async (req: Request, res: Response): Promise<void> => {
    const { titre, texte_long, resume, image, date } = req.body;

    if (!titre || !texte_long || !resume || !date) {
        res.status(400).json({ message: 'Les champs titre, texte_long, résumé et date sont obligatoires.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO actualite (titre, texte_long, resume, image, date) VALUES (?, ?, ?, ?, ?)', 
            [titre, texte_long, resume, image, date]
        );
        res.status(201).json({ message: 'Actualité ajoutée avec succès.', id_actualite: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'actualité.' });
    }
};

// Mettre à jour une actualité
export const updateActualite = async (req: Request, res: Response): Promise<void> => {
    const actualiteId = req.params.id;
    const { titre, texte_long, resume, image, date } = req.body;

    if (!titre && !texte_long && !resume && !image && !date) {
        res.status(400).json({ message: 'Au moins un champ doit être mis à jour.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE actualite SET titre = ?, texte_long = ?, resume = ?, image = ?, date = ? WHERE id_actualite = ?', 
            [titre, texte_long, resume, image, date, actualiteId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Actualité mise à jour avec succès.' });
        } else {
            res.status(404).json({ message: 'Actualité non trouvée.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'actualité.' });
    }
};

// Supprimer une actualité
export const deleteActualite = async (req: Request, res: Response): Promise<void> => {
    const actualiteId = req.params.id;

    try {
        const [result] = await db.query<ResultSetHeader>('DELETE FROM actualite WHERE id_actualite = ?', [actualiteId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Actualité supprimée avec succès.' });
        } else {
            res.status(404).json({ message: 'Actualité non trouvée.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'actualité.' });
    }
};