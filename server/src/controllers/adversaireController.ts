import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Récupérer tous les adversaires
export const getAllAdversaires = async (req: Request, res: Response): Promise<void> => {
    try {
        const [adversaires] = await db.query<RowDataPacket[]>('SELECT * FROM adversaire');
        res.status(200).json(adversaires);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des adversaires.' });
    }
};

// Récupérer un adversaire
export const getAdversaireByID = async (req: Request, res: Response): Promise<void> => {
    const id_adversaire = req.params.id_adversaire;
    try {
        const [adversaire] = await db.query<RowDataPacket[]>('SELECT * FROM adversaire WHERE id_adversaire = ?', [id_adversaire]);
        res.status(200).json(adversaire);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'adversaire.' });
    }
};

// Ajouter un nouvel adversaire
export const addAdversaire = async (req: Request, res: Response): Promise<void> => {
    const { nom_adversaire } = req.body;

    if (!nom_adversaire) {
        res.status(400).json({ message: 'Le nom de l\'adversaire est requis.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>('INSERT INTO adversaire (nom_adversaire) VALUES (?)', [nom_adversaire]);
        res.status(201).json({ message: 'Adversaire ajouté avec succès.', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'adversaire.' });
    }
};

// Supprimer un adversaire
export const deleteAdversaire = async (req: Request, res: Response): Promise<void> => {
    const adversaireId = req.params.id_adversaire;

    try {
        const [result] = await db.query<ResultSetHeader>('DELETE FROM adversaire WHERE id_adversaire = ?', [adversaireId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Adversaire supprimé avec succès.' });
        } else {
            res.status(404).json({ message: 'Adversaire non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'adversaire.' });
    }
};
