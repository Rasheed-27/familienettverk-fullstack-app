import Content from '../models/contentModel.js';
import asyncHandler from 'express-async-handler';

// GET /api/content
export const getContent = asyncHandler(async (req, res) => {
  // ابحث عن مستند المحتوى. إذا لم يكن موجودًا، أنشئه بقيم افتراضية.
  let content = await Content.findOne();
  if (!content) {
    console.log('No content found, creating a new one.');
    content = await new Content().save();
  }
  res.json(content);
});

// PUT /api/content
export const updateContent = asyncHandler(async (req, res) => {
  // ابحث عن المستند الموجود أو أنشئ واحدًا جديدًا إذا لم يكن موجودًا
  const content = await Content.findOneAndUpdate(
    {}, // ابحث عن أي مستند (سيكون هناك واحد فقط)
    { $set: req.body }, // استخدم $set لتحديث الحقول الموجودة فقط
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  
  console.log('Content updated successfully:', content);
  res.json(content);
});