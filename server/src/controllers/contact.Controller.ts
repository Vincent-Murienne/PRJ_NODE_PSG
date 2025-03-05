import { Request, Response } from 'express';
import db from '../db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// Récupérer tous les contacts
export const getAllContacts = async (req: Request, res: Response): Promise<void> => {
    try {
        const [contacts] = await db.query<RowDataPacket[]>('SELECT * FROM contact');
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des contacts.' });
    }
};

// Récupérer un contact par ID
export const getContactByID = async (req: Request, res: Response): Promise<void> => {
    const id_contact = req.params.id_contact;
    try {
        const [contact] = await db.query<RowDataPacket[]>('SELECT * FROM contact WHERE id_contact = ?', [id_contact]);
        res.status(200).json(contact.shift());
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération du contact." });
    }
};

// Ajouter un contact
export const addContact = async (req: Request, res: Response): Promise<void> => {
    const { email, message } = req.body;

    if (!email || !message) {
        res.status(400).json({ message: 'Les champs email et message sont obligatoires.' });
        return;
    }

    try {
        // Récupérer les informations de l'utilisateur par email
        const [user] = await db.query<RowDataPacket[]>('SELECT name, email FROM user WHERE email = ?', [email]);

        if (user.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
            return;
        }

        const { name } = user[0];

        // Insérer le contact dans la table
        const [result] = await db.query<ResultSetHeader>(
            'INSERT INTO contact (email, message, name) VALUES (?, ?, ?)',
            [email, message, name]
        );

        res.status(201).json({ message: 'Contact ajouté avec succès.', id_contact: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de l\'ajout du contact.' });
    }
};

// Mettre à jour un contact
export const updateContact = async (req: Request, res: Response): Promise<void> => {
    const contactId = req.params.id_contact;
    const { name, email, message } = req.body;

    if (!name && !email && !message) {
        res.status(400).json({ message: 'Au moins un champ doit être mis à jour.' });
        return;
    }

    try {
        const [result] = await db.query<ResultSetHeader>(
            'UPDATE contact SET name = ?, email = ?, message = ? WHERE id_contact = ?',
            [name, email, message, contactId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Contact mis à jour avec succès.' });
        } else {
            res.status(404).json({ message: 'Contact non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du contact.' });
    }
};

// Supprimer un contact
export const deleteContact = async (req: Request, res: Response): Promise<void> => {
    const contactId = req.params.id_contact;

    try {
        const [result] = await db.query<ResultSetHeader>('DELETE FROM contact WHERE id_contact = ?', [contactId]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Contact supprimé avec succès.' });
        } else {
            res.status(404).json({ message: 'Contact non trouvé.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du contact.' });
    }
};