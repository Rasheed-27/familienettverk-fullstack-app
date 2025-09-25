import express from 'express';
import { getStats, updateStats } from '../controllers/statController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getStats).put(protect, admin, updateStats);
export default router;