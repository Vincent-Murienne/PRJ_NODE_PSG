import { Router } from 'express';
import { addUser, updateUser, deleteUser, getAllUsersWithRoles, getUserByIdWithRole, activateUser, getAllUsersNoActivate } from '../controllers/userController';
import { authorizeRole, authenticateToken } from '../middlewares/auth';

const router = Router();

// Route pour récupérer tous les utilisateurs
router.get('/users', authenticateToken, getAllUsersWithRoles);

// Route pour récupérer un utilisateur
router.get('/users/:id_user', authenticateToken, getUserByIdWithRole);

// Route pour récupérer tous les utilisateurs non activés
router.get('/users-no-activate', authenticateToken, authorizeRole([1]), getAllUsersNoActivate);

// Route pour ajouter un nouvel utilisateur
router.post('/register', addUser);

// Route pour mettre à jour un utilisateur
router.put('/users/:id_user', authenticateToken, authorizeRole([1]), updateUser);

// Route pour activer un compte via un compte administrateur
router.put('/users/:id_user/activate', authenticateToken, authorizeRole([1]), activateUser);

// Route pour supprimer un utilisateur
router.delete('/users/:id_user', authenticateToken, authorizeRole([1]), deleteUser);

export default router;
