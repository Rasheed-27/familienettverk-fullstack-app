import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import Member from '../models/memberModel.js';

// 1. وسيط للتحقق من أن المستخدم مسجل دخوله
export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Member.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// 2. وسيط للتحقق من أن المستخدم المسجل هو مدير
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // المستخدم هو مدير، اسمح له بالمرور
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};