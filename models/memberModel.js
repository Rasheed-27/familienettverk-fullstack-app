import mongoose from 'mongoose';

const multiLangStringOptional = { type: { ar: String, en: String, no: String } };

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title: multiLangStringOptional,
  imageUrl: { type: String, default: 'https://i.pravatar.cc/150' },
  isApproved: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

export default Member;