import { Router } from 'express';
import { addActualite, updateActualite, deleteActualite, getAllActualites, getActualiteByID } from '../controllers/actualiteController'; // Assurez-vous que le chemin est correct
import { authorizeRole, authenticateToken } from '../middlewares/auth';

const router = Router();

// Route pour récupérer toutes les actualités
router.get('/actualites', getAllActualites);

// Route pour récupérer une actualité
router.get('/actualites/:id_actualite', getActualiteByID);

// Route pour ajouter une nouvelle actualité
router.post('/actualites', authenticateToken, addActualite);

// Route pour mettre à jour une actualité
router.put('/actualites/:id_actualite', authenticateToken, updateActualite);

// Route pour supprimer une actualité
router.delete('/actualites/:id_actualite', authenticateToken, authorizeRole([1]), deleteActualite);

export default router;
