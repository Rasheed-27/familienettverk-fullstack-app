import express from 'express';
import {
  registerMember, loginMember, getMemberProfile, updateMemberProfile,
  getAllMembers, getApprovedMembers, toggleMemberApproval, deleteMember
} from '../controllers/memberController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/register', registerMember);
router.post('/login', loginMember);
router.route('/profile').get(protect, getMemberProfile).put(protect, updateMemberProfile);
router.get('/approved', getApprovedMembers);

// تأمين مسارات الإدارة
router.get('/', protect, admin, getAllMembers);
router.put('/:id/toggle-approval', protect, admin, toggleMemberApproval);
router.delete('/:id', protect, admin, deleteMember);

export default router;