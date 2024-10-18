import { Router } from 'express';
import { updateClubDetails, getAllClubs, updateClubPresentation } from '../controllers/clubController';
import { authorizeRole, authenticateToken } from '../middlewares/auth';

const router = Router();

// Route pour récupérer les informations du club
router.get('/clubs', getAllClubs);

// Route pour mettre à jour la présentation et l'histoire du club
router.put('/clubs/:id_club', authenticateToken, authorizeRole([1]), updateClubDetails);

// Route pour mettre à jour uniquement la présentation du club
router.put('/clubs/:id_club/presentation', authenticateToken, authorizeRole([1]), updateClubPresentation);

export default router;
