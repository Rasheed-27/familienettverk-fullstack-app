import Member from '../models/memberModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// دالة مساعدة لإنشاء التوكن
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    تسجيل عضو جديد
// @route   POST /api/members/register
export const registerMember = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }
  const memberExists = await Member.findOne({ email });
  if (memberExists) {
    res.status(400);
    throw new Error('Member with this email already exists');
  }
  
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const member = await Member.create({
    fullName,
    email,
    password: hashedPassword,
  });

  if (member) {
    res.status(201).json({
      _id: member._id,
      fullName: member.fullName,
      email: member.email,
      token: generateToken(member._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid member data');
  }
});

// @desc    تسجيل دخول عضو
// @route   POST /api/members/login
export const loginMember = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const member = await Member.findOne({ email });

  if (member && (await bcrypt.compare(password, member.password))) {
    res.json({
      _id: member._id,
      fullName: member.fullName,
      email: member.email,
      isAdmin: member.isAdmin,
      token: generateToken(member._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Get user profile
// @route   GET /api/members/profile
// @access  Private
export const getMemberProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

// @desc    Update user profile
// @route   PUT /api/members/profile
// @access  Private
export const updateMemberProfile = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.user._id);
  if (member) {
    member.fullName = req.body.fullName || member.fullName;
    member.phone = req.body.phone || member.phone;
    member.specialty = req.body.specialty || member.specialty;
    member.bio = req.body.bio || member.bio;
    member.imageUrl = req.body.imageUrl || member.imageUrl;
    
    const updatedMember = await member.save();
    res.json(updatedMember);
  } else {
    res.status(404);
    throw new Error('Member not found');
  }
});


// --- الدوال الإدارية ---

// @desc    جلب كل الأعضاء
export const getAllMembers = asyncHandler(async (req, res) => {
  const members = await Member.find({});
  res.json(members);
});

// @desc    جلب الأعضاء الموافق عليهم
export const getApprovedMembers = asyncHandler(async (req, res) => {
  const members = await Member.find({ isApproved: true });
  res.json(members);
});

// @desc    تغيير حالة الموافقة
export const toggleMemberApproval = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);
  if (member) {
    member.isApproved = !member.isApproved;
    await member.save();
    res.json(member);
  } else {
    res.status(404).json({ message: 'Member not found' });
  }
});

// @desc    حذف عضو
export const deleteMember = asyncHandler(async (req, res) => {
  const member = await Member.findByIdAndDelete(req.params.id);
  if (!member) return res.status(404).json({ message: 'Member not found' });
  res.json({ message: 'Member removed' });
});