import express from 'express';
import {
  getActivities, addPhoto, deletePhoto, addVideo, deleteVideo
} from '../controllers/activityController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getActivities);
router.post('/photos', protect, admin, addPhoto);
router.delete('/photos/:photoId', protect, admin, deletePhoto);
router.post('/videos', protect, admin, addVideo);
router.delete('/videos/:videoId', protect, admin, deleteVideo);
export default router;