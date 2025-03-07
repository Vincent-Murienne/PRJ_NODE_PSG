import { Router } from 'express';
import { addActualite, updateActualite, deleteActualite, getAllActualites, getActualiteByID, getLastActualite, getLastThreeActualites } from '../controllers/actualiteController'; // Assurez-vous que le chemin est correct
import { authorizeRole, authenticateToken } from '../middlewares/auth';
import { upload } from '../middlewares/upload';

const router = Router();

// Route pour récupérer toutes les actualités
router.get('/actualites', getAllActualites);

// Route pour récupérer une actualité
router.get('/actualites/:id_actualite', getActualiteByID);

// Route pour récupérer la dernière actualité
router.get('/last-actualites', getLastActualite);

// Route pour récupérer les 3 dernières actualités
router.get('/three-last-actualites', getLastThreeActualites);

// Route pour ajouter une nouvelle actualité avec upload d'image
router.post('/actualites', authenticateToken, upload.single('image'), addActualite);

// Route pour mettre à jour une actualité
router.put('/actualites/:id_actualite', authenticateToken, upload.single('image'), updateActualite);

// Route pour supprimer une actualité
router.delete('/actualites/:id_actualite', authenticateToken, authorizeRole([1]), deleteActualite);

export default router;
