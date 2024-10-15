import { Router } from 'express';
import { addActualite, updateActualite, deleteActualite, getAllActualites } from '../controllers/actualiteController'; // Assurez-vous que le chemin est correct

const router = Router();

// Route pour récupérer toutes les actualités
router.get('/actualites', getAllActualites);

// Route pour ajouter une nouvelle actualité
router.post('/actualites', addActualite);

// Route pour mettre à jour une actualité
router.put('/actualites/:id', updateActualite);

// Route pour supprimer une actualité
router.delete('/actualites/:id', deleteActualite);

export default router;
