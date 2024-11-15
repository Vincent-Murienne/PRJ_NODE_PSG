import { Request, Response } from 'express';
import db from '../db';
import { RowDataPacket } from 'mysql2';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import SimpleCrypto from 'simple-crypto-js';

// Clé secrète pour SimpleCrypto
const simpleCrypto = new SimpleCrypto('votre_cle_secrete');

// Clé secrète pour JWT
const JWT_SECRET = 'votre_jwt_secret';

// Durée de validité du jeton (30 secondes)
const JWT_EXPIRATION = '3000s';

// Connexion de l'utilisateur
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Email et mot de passe sont requis.' });
        return;
    }

    try {
        // Rechercher l'utilisateur dans la base de données
        console.log(`Recherche de l'utilisateur avec l'email : ${email}`);
        const [rows] = await db.query<RowDataPacket[]>(
            `SELECT u.*, r.nom_role FROM user u 
            LEFT JOIN role r ON u.id_role = r.id_role 
            WHERE u.email = ?`,
            [email]
        );
        

        if (rows.length === 0) {
            console.log('Utilisateur non trouvé.');
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
            return;
        }

        const user = rows[0];
        console.log('Utilisateur trouvé :', user);

        // Vérifier si le mot de passe est correct
        if (!user.password.startsWith('$')) {
            console.log('Mot de passe stocké non valide.');
            res.status(500).json({ message: 'Mot de passe stocké non valide. Contactez l\'administrateur.' });
            return;
        }

        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
            console.log('Mot de passe incorrect.');
            res.status(401).json({ message: 'Mot de passe incorrect.' });
            return;
        }

        if (!user.isActive) {
            console.log('Compte non activé.');
            res.status(403).json({ message: 'Votre compte n\'est pas encore activé.' });
            return;
        }

        // Créer un JWT pour l'utilisateur
        console.log('Création du JWT pour l\'utilisateur.');
        const token = jwt.sign(
            { id: user.id_user, email: user.email, role: user.id_role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );

        // Crypter le mot de passe avec SimpleCrypto
        const encryptedPassword = simpleCrypto.encrypt(password);
        console.log('Mot de passe crypté:', encryptedPassword);

        // Log pour vérifier le rôle avant de le retourner
        console.log('Rôle de l\'utilisateur:', user.id_role);

        // Retourner le jeton JWT, le mot de passe crypté et le rôle
        res.status(200).json({
            message: 'Connexion réussie.',
            token,
            encryptedPassword,
            role: user.id_role // Ajout du rôle ici pour vérifier
        });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
};
