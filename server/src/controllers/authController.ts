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
        const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM user WHERE email = ?', [email]);

        if (rows.length === 0) {
            res.status(404).json({ message: 'Utilisateur non trouvé.' });
            return;
        }

        const user = rows[0];

        // Vérifier si le mot de passe est correct
        const validPassword = await argon2.verify(user.password, password);
        if (!validPassword) {
            res.status(401).json({ message: 'Mot de passe incorrect.' });
            return;
        }

        if (!user.isActive) {
            res.status(403).json({ message: 'Votre compte n\'est pas encore activé.' });
            return;
        }        

        // Créer un JWT pour l'utilisateur
        const token = jwt.sign(
            { id: user.id_user, email: user.email, role: user.id_role },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
        );


        // Crypter le mot de passe avec SimpleCrypto
        const encryptedPassword = simpleCrypto.encrypt(password);
        // Retourner le jeton JWT et le mot de passe crypté
        res.status(200).json({
            message: 'Connexion réussie.',
            token,
            encryptedPassword
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }

    
};
