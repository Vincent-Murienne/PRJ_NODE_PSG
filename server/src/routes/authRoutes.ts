import { Router } from 'express';
import { loginUser } from '../controllers/authController';

const router = Router();

// Route de connexion
router.post('/login', loginUser);

export default router;
