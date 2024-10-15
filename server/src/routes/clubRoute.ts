import express from 'express';
import { getClubInfo, updateClubInfo } from '../controllers/clubController';
import { isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/', getClubInfo);
router.put('/', isAdmin, updateClubInfo);

export default router;