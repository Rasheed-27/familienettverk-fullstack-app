import mongoose from 'mongoose';

const multiLangStringRequired = {
  type: { ar: String, en: String, no: String },
  required: true,
};

const statSchema = new mongoose.Schema({
  label: multiLangStringRequired,
  number: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Stat = mongoose.model('Stat', statSchema);

export default Stat;