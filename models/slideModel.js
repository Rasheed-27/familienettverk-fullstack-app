import mongoose from 'mongoose';

const multiLangStringRequired = { type: { ar: String, en: String, no: String }, required: true };
const multiLangStringOptional = { type: { ar: String, en: String, no: String } };

const slideSchema = new mongoose.Schema({
  title: multiLangStringRequired,
  subtitle: multiLangStringOptional,
  imageUrl: { type: String, required: true },
  buttonText: multiLangStringOptional,
  buttonLink: String,
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Slide = mongoose.model('Slide', slideSchema);

export default Slide;