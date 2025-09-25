import express from 'express';
import { getSlides, addSlide, updateSlide, deleteSlide } from '../controllers/slideController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getSlides).post(protect, admin, addSlide);
router.route('/:id').put(protect, admin, updateSlide).delete(protect, admin, deleteSlide);
export default router;