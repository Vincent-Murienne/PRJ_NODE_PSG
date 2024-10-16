import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import argon2 from 'argon2';  // Utiliser Argon2 pour hacher les mots de passe

// Récupérer tous les utilisateurs
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const [users] = await db.query<RowDataPacket[]>('SELECT * FROM user');
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
};

// Ajouter un nouvel utilisateur
export const addUser = async (req: Request, res: Response): Promise<void> => {
    const { full_name, email, password, id_role } = req.body;

    if (req.body.role !== 1) {
        res.status(403).json({ message: 'Accès interdit.' });
        return;
    }

    if (!full_name || !email || !password || !id_role) {
        res.status(400).json({ message: 'Tous les champs sont requis.' });
        return;
    }

    try {
        // Hacher le mot de passe avec Argon2
        const hashedPassword = await argon2.hash(password);

        // Insérer un nouvel utilisateur avec un mot de passe haché
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO user (full_name, email, password, isActive, id_role) VALUES (?, ?, ?, ?, ?)',
            [full_name, email, hashedPassword, false, id_role]
        );

        res.status(201).json({ message: 'Utilisateur ajouté avec succès.', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur.' });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const { full_name, email, password, isActive, id_role } = req.body;

    try {
        let hashedPassword = undefined;

        // Si un nouveau mot de passe est fourni, le hacher
        if (password) {
            hashedPassword = await argon2.hash(password);
        }

        // Construire la requête SQL
        const query = `
            UPDATE user 
            SET full_name = ?, email = ?, ${password ? 'password = ?,' : ''} isActive = ?, id_role = ? 
            WHERE id_user = ?
        `;
        const values = [
            full_name,
            email,
            ...(password ? [hashedPassword] : []), // Ajouter le mot de passe s'il est présent
            isActive,
            id_role,
            userId
        ];

        const [result] = await db.query<ResultSetHeader>(query, values);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Utilisateur mis à jour avec succès.' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
    }
};

// Supprimer un utilisateur
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;

    try {
        const [result] = await db.query<ResultSetHeader>('DELETE FROM user WHERE id_user = ?', [userId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
    }
};
