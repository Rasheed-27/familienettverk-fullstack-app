import mongoose from 'mongoose';

const multiLangStringRequired = {
  type: { ar: String, en: String, no: String },
  required: true,
};

// مخطط فرعي للصور
const photoSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: multiLangStringRequired, // <-- حقل جديد: العنوان
  category: multiLangStringRequired, // <-- حقل جديد: الفئة (مثل "فعالية", "ورشة عمل")
  description: multiLangStringRequired,
  eventDate: { type: Date, default: Date.now }, // <-- حقل جديد: تاريخ الفعالية
});
// مخطط فرعي للفيديوهات
const videoSchema = new mongoose.Schema({
  youtubeVideoId: { type: String, required: true },
  title: multiLangStringRequired,
});

// المخطط الرئيسي للأنشطة
const activitySchema = new mongoose.Schema({
  photos: [photoSchema],
  videos: [videoSchema],
}, { timestamps: true });

// تعريف نموذج "Activity" مرة واحدة فقط
const Activity = mongoose.model('Activity', activitySchema);

export default Activity;