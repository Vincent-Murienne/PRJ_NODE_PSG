import { Router } from 'express';
import { updatePresentation, getAllClubs  } from '../controllers/clubController'; // Assure-toi que le chemin est correct

const router = Router();

// Route pour mettre à jour la colonne présentation du club
router.put('/clubs/:id/presentation', updatePresentation);

router.get('/clubs', getAllClubs);

export default router;
