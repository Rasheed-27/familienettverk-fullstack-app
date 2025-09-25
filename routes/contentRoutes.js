import express from 'express';
import { getContent, updateContent } from '../controllers/contentController.js';
// import { protect, admin } from '../middleware/authMiddleware.js'; // سنضيف الحماية لاحقًا

const router = express.Router();
router.route('/').get(getContent).put(updateContent); // .put(protect, admin, updateContent)
export default router;