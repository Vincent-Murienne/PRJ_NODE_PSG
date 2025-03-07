import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { log } from 'console';
const currentDate = new Date().toISOString().split('T')[0];


// Récupérer toutes les actualités
export const getAllActualites = async (req: Request, res: Response): Promise<void> => {
    try {
        const [actualites] = await db.query<RowDataPacket[]>('SELECT * FROM actualite ORDER BY date DESC');
        res.status(200).json(actualites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des actualités.' });
    }
};

// Récupérer une seule actualité
export const getActualiteByID = async (req: Request, res: Response): Promise<void> => {
    const id_actualite = req.params.id_actualite;
    try {
        const [actualite] = await db.query<RowDataPacket[]>('SELECT * FROM actualite WHERE id_actualite = ?', [id_actualite]);
        res.status(200).json(actualite.shift());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de l\'actualité." });
    }
};

// Récupérer la dernière actualité
export const getLastActualite = async (req: Request, res: Response): Promise<void> => {
    const id_actualite = req.params.id_actualite;
    try {
        const [actualites] = await db.query<RowDataPacket[]>('SELECT * FROM actualite ORDER BY id_actualite DESC LIMIT 1', [id_actualite]);
        res.status(200).json(actualites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de la dernière actualité" });
    }
};

// Récupérer les 3 dernières actualités
export const getLastThreeActualites = async (req: Request, res: Response): Promise<void> => {
    const id_actualite = req.params.id_actualite;
    try {
        const [actualites] = await db.query<RowDataPacket[]>('SELECT * FROM actualite ORDER BY id_actualite DESC LIMIT 3', [id_actualite]);
        res.status(200).json(actualites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des 3 dernières actualités" });
    }
};

export const addActualite = async (req: Request, res: Response): Promise<void> => {
    const { titre, texte_long, resume } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('Body:', req.file);
    console.log('Image:', image);


    // Validation des données
    if (!titre) {
        res.status(400).json({ message: 'Le titre est obligatoire.' });
        return;
    }
    if (!texte_long) {
        res.status(400).json({ message: 'Le texte long est obligatoire.' });
        return;
    }
    if (!resume) {
        res.status(400).json({ message: 'Le résumé est obligatoire.' });
        return;
    }
    if (!image) {
        res.status(400).json({ message: 'L\'image est obligatoire.' });
        return;
    }

    const currentDate = new Date();

    try {
        const [result] = await db.query(
            'INSERT INTO actualite (titre, texte_long, resume, image, date) VALUES (?, ?, ?, ?, ?)', 
            [titre, texte_long, resume, image, currentDate]
        );

        const insertedId = (result as any).insertId;

        res.status(201).json({ 
            message: 'Actualité ajoutée avec succès.', 
            id_actualite: insertedId, 
            imageUrl: image 
        });
    } catch (error) {
        console.error('Erreur détaillée lors de l\'ajout de l\'actualité:', error);
        
        if (error instanceof Error) {
            res.status(500).json({ 
                message: 'Erreur lors de l\'ajout de l\'actualité.', 
                details: error.message 
            });
        } else {
            res.status(500).json({ message: 'Erreur inconnue lors de l\'ajout de l\'actualité.' });
        }
    }
};


// Mettre à jour une actualité
export const updateActualite = async (req: Request, res: Response): Promise<void> => {
    const actualiteId = req.params.id_actualite;
    const { titre, texte_long, resume, image } = req.body;

    if (!titre && !texte_long && !resume && !image) {
        res.status(400).json({ message: 'Au moins un champ doit être mis à jour.' });
        return;
    }

    const currentDate = new Date();

    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE actualite SET titre = ?, texte_long = ?, resume = ?, image = ?, date = ? WHERE id_actualite = ?', 
            [titre, texte_long, resume, image, currentDate, actualiteId]
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
    const actualiteId = req.params.id_actualite;

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
