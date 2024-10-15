import { Router } from 'express';
import { addDuel, updateDuel, deleteDuel, getAllDuels } from '../controllers/duelController'; // Assurez-vous que le chemin est correct

const router = Router();

// Route pour récupérer tous les duels
router.get('/duels', getAllDuels);

// Route pour ajouter un nouveau duel
router.post('/duels', addDuel);

// Route pour mettre à jour un duel
router.put('/duels/:id', updateDuel);

// Route pour supprimer un duel
router.delete('/duels/:id', deleteDuel);

export default router;
