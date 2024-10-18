import { Router } from 'express';
import { addAdversaire, deleteAdversaire, getAdversaireByID, getAllAdversaires } from '../controllers/adversaireController'; // Assurez-vous que le chemin est correct
import { authorizeRole, authenticateToken } from '../middlewares/auth';

const router = Router();

// Route pour récupérer tous les adversaires
router.get('/adversaires', getAllAdversaires);

// Route pour récupérer un adversaire
router.get('/adversaires/:id_adversaire', getAdversaireByID);

// Route pour ajouter un nouvel adversaire
router.post('/adversaires', authenticateToken, authorizeRole([1]), addAdversaire);

// Route pour supprimer un adversaire
router.delete('/adversaires/:id_adversaire', authenticateToken, authorizeRole([1]), deleteAdversaire);

export default router;
