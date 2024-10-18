import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayloadWithRole } from '../type';

const JWT_SECRET = 'votre_jwt_secret';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Accès non autorisé. Jeton manquant.' });
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).json({ message: 'Jeton invalide ou expiré.' });
            return;
        }

        const decodedUser = user as JwtPayloadWithRole;

        req.user = {
            ...decodedUser,
            id_role: decodedUser.role
        };

        next();
    });
};


export const authorizeRole = (role: number[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const id_role = req.user?.id_role;
        if (!id_role || !role.includes(id_role)) {
            res.status(403).json({ message: 'Accès refusé.' });
            return;
        }
        next();
    };
};
