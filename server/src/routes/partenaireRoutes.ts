import { Router } from 'express';
import { addPartenaire, updatePartenaire, deletePartenaire, getAllPartenaires, getPartenaireByID } from '../controllers/partenaireController'; // Assurez-vous que le chemin est correct
import { authorizeRole, authenticateToken } from '../middlewares/auth';

const router = Router();

// Route pour récupérer tous les partenaires
router.get('/partenaires', getAllPartenaires);

// Route pour récupérer un partenaire
router.get('/partenaires/:id_partenaire', getPartenaireByID);

// Route pour ajouter un nouveau partenaire
router.post('/partenaires', authenticateToken, authorizeRole([1]), addPartenaire);

// Route pour mettre à jour un partenaire
router.put('/partenaires/:id_partenaire', authenticateToken, updatePartenaire);

// Route pour supprimer un partenaire
router.delete('/partenaires/:id_partenaire', authenticateToken, authorizeRole([1]), deletePartenaire);

export default router;
