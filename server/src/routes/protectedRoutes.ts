import { Router, Request, Response } from 'express';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

// Exemple de route protégée qui nécessite une authentification
router.get('/profile', authenticateToken, (req: Request, res: Response) => {
    // Accéder aux informations de l'utilisateur depuis req.user
    res.status(200).json({
        message: 'Profil utilisateur récupéré avec succès.',
        user: req.user
    });
});

// Une autre route protégée
router.get('/dashboard', authenticateToken, (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Accès autorisé au tableau de bord.',
        user: req.user
    });
});

export default router;
