import { Router } from 'express';
import { addAdversaire, deleteAdversaire, getAllAdversaires } from '../controllers/adversaireController'; // Assurez-vous que le chemin est correct

const router = Router();

// Route pour récupérer tous les adversaires
router.get('/adversaires', getAllAdversaires);

// Route pour ajouter un nouvel adversaire
router.post('/adversaires', addAdversaire);

// Route pour supprimer un adversaire
router.delete('/adversaires/:id', deleteAdversaire);

export default router;
