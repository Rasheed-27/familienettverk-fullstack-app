import mongoose from 'mongoose';

const multiLangString = { 
  ar: { type: String, default: '' }, 
  en: { type: String, default: '' }, 
  no: { type: String, default: '' } 
};

const contentSchema = new mongoose.Schema({
  welcomeVideoUrl: { type: String, default: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  homeAboutSnippet: {
    title: multiLangString,
    text: multiLangString,
  },
  aboutPage: {
    introduction: { title: multiLangString, text: multiLangString },
    vision: { title: multiLangString, text: multiLangString },
    mission: { title: multiLangString, text: multiLangString },
  },
  contactInfo: {
    address: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
      linkedin: { type: String, default: '' }
    }
  }
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

// --- السطر المضاف ---
export default Content;