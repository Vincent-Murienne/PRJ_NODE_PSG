import { Router } from 'express';
import { addUser, updateUser, deleteUser, getAllUsers } from '../controllers/userController';
import { authenticateToken } from '../middlewares/auth';  // Assurez-vous que le chemin est correct

const router = Router();

// Route protégée pour récupérer tous les utilisateurs
router.get('/users', authenticateToken, getAllUsers);

// Route protégée pour ajouter un nouvel utilisateur
router.post('/users', authenticateToken, addUser);

// Route protégée pour mettre à jour un utilisateur
router.put('/users/:id', authenticateToken, updateUser);

// Route protégée pour supprimer un utilisateur
router.delete('/users/:id', authenticateToken, deleteUser);

export default router;
