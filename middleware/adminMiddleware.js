import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Member from '../models/memberModel.js';

// وسيط للتحقق من أن المستخدم مسجل دخوله
const protect = asyncHandler(async (req, res, next) => {
  // ... (هذا هو نفس كود protect من authMiddleware.js)
});

// وسيط جديد للتحقق من أن المستخدم هو مدير
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

// --- سنحتاج إلى نظام تسجيل دخول للمدير أولاً ---
// بما أننا نستخدم كلمة مرور ثابتة حاليًا، سننشئ وسيط حماية أبسط للتوكن.

// لنعدل authMiddleware.js بدلاً من ذلك