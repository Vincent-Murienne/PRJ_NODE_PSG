import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import argon2 from 'argon2';  // Utiliser Argon2 pour hacher les mots de passe

// Récupérer tous les utilisateurs
export const getAllUsersWithRoles = async (req: Request, res: Response): Promise<void> => {
    try {
        const [users] = await db.query<RowDataPacket[]>(
            `SELECT u.id_user, u.full_name, u.email, u.password, u.isActive, r.nom_role 
            FROM user u
            JOIN role r ON u.id_role = r.id_role`
        );

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
};

// Récupérer un user
export const getUserByIdWithRole = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id_user;

    try {
        const [user] = await db.query<RowDataPacket[]>(
            `SELECT u.id_user, u.full_name, u.email, u.password, u.isActive, r.nom_role 
            FROM user u
            JOIN role r ON u.id_role = r.id_role
            WHERE u.id_user = ?`,
            [userId]
        );

        if (user.length > 0) {
            res.status(200).json(user[0]);
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
    }
};

// Récupérer tous les utilisateurs ayant un compte non activé
export const getAllUsersNoActivate = async (req: Request, res: Response): Promise<void> => {
    try {
        const [users] = await db.query<RowDataPacket[]>(
            `SELECT u.id_user, u.full_name, u.email, u.password, u.isActive, r.nom_role 
            FROM user u
            JOIN role r ON u.id_role = r.id_role
            WHERE u.isActive = 0`
        );

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
    }
};

// Ajouter un nouvel utilisateur
export const addUser = async (req: Request, res: Response): Promise<void> => {
    const { full_name, email, password} = req.body;

    if (!full_name || !email || !password) {
        res.status(400).json({ message: 'Tous les champs sont requis.' });
        return;
    }

    try {
        // Hacher le mot de passe avec Argon2
        const hashedPassword = await argon2.hash(password);

        // Insérer un nouvel utilisateur avec un mot de passe haché
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO user (full_name, email, password, isActive, id_role) VALUES (?, ?, ?, ?, ?)',
            [full_name, email, hashedPassword, false, 2]
        );

        res.status(201).json({ message: 'Utilisateur ajouté avec succès.', id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'utilisateur.' });
    }
};

export const activateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id_user;

    if (req.user?.role !== 1) {
        res.status(403).json({ message: 'Accès refusé. Seuls les administrateurs peuvent activer un utilisateur.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE user SET isActive = true WHERE id_user = ?', 
            [userId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Utilisateur activé avec succès.' });
        } else {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'activation de l\'utilisateur.' });
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id_user;
    const { full_name, email, password } = req.body;

    try {
        let hashedPassword = undefined;

        // Si un nouveau mot de passe est fourni, le hacher
        if (password) {
            hashedPassword = await argon2.hash(password);
        }

        // Construire la requête SQL de manière conditionnelle
        const queryParts = [
            'UPDATE user SET full_name = ?, email = ?'
        ];
        const values = [full_name, email];

        // Ajouter la mise à jour du mot de passe uniquement si elle est fournie
        if (password) {
            queryParts.push(', password = ?');
            values.push(hashedPassword);
        }

        queryParts.push('WHERE id_user = ?');
        values.push(userId);

        const query = queryParts.join(' ');

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
    const userId = req.params.id_user;

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
