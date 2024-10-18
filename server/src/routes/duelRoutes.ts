import { Router } from 'express';
import { addDuel, updateDuel, deleteDuel, getAllDuels, getAllDuelsWithScore, getDuelByIDWithScore, getCalendrier, updateMatchScore } from '../controllers/duelController'; // Assurez-vous que le chemin est correct
import { authorizeRole, authenticateToken } from '../middlewares/auth';

const router = Router();

// Route pour récupérer tous les matchs
router.get('/duels', getAllDuels);

// Route pour récupérer tous les matchs avec un score
router.get('/duels/score', getAllDuelsWithScore);

// Route pour récupérer un match avec un score
router.get('/duels/:id_match/score', getDuelByIDWithScore);

// Route pour récupérer les 3 derniers et 3 prochains matchs
router.get('/duels/:id_section/calendrier', getCalendrier);

// Route pour ajouter un nouveau match
router.post('/duels', authenticateToken, addDuel);

// Route pour mettre à jour un match
router.put('/duels/:id_match', authenticateToken, updateDuel);

// Route pour mettre à jour le score d'un match déjà joué
router.put('/duels/:id_match/score', authenticateToken, updateMatchScore);

// Route pour supprimer un match
router.delete('/duels/:id_match', authenticateToken, authorizeRole([1]), deleteDuel);

export default router;
