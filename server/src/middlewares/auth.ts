import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'votre_jwt_secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Accès non autorisé. Jeton manquant.' });
        return; // Ajoutez un retour ici pour éviter de continuer l'exécution
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Jeton invalide ou expiré.' });
            return; // Ajoutez un retour ici également
        }

        // Ajoute l'utilisateur à la requête pour un usage ultérieur
        req.user = user;
        next(); // Appel de la prochaine fonction
    });
};
