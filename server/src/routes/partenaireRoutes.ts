import { Router } from 'express';
import { addPartenaire, updatePartenaire, deletePartenaire, getAllPartenaires } from '../controllers/partenaireController'; // Assurez-vous que le chemin est correct

const router = Router();

// Route pour récupérer tous les partenaires
router.get('/partenaires', getAllPartenaires);

// Route pour ajouter un nouveau partenaire
router.post('/partenaires', addPartenaire);

// Route pour mettre à jour un partenaire
router.put('/partenaires/:id', updatePartenaire);

// Route pour supprimer un partenaire
router.delete('/partenaires/:id', deletePartenaire);

export default router;
