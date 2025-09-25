import Slide from '../models/slideModel.js';
import asyncHandler from 'express-async-handler';

// @desc    جلب كل الشرائح
// @route   GET /api/slides
export const getSlides = asyncHandler(async (req, res) => {
  const slides = await Slide.find({}).sort({ order: 'asc' });
  res.json(slides);
});

// @desc    إضافة شريحة جديدة
// @route   POST /api/slides
export const addSlide = asyncHandler(async (req, res) => {
  const newSlide = new Slide(req.body);
  const createdSlide = await newSlide.save();
  res.status(201).json(createdSlide);
});

// @desc    تحديث شريحة
// @route   PUT /api/slides/:id
export const updateSlide = asyncHandler(async (req, res) => {
  const slide = await Slide.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!slide) {
    res.status(404);
    throw new Error('Slide not found');
  }
  res.json(slide);
});

// @desc    حذف شريحة
// @route   DELETE /api/slides/:id
export const deleteSlide = asyncHandler(async (req, res) => {
  const slide = await Slide.findByIdAndDelete(req.params.id);
  if (!slide) {
    res.status(404);
    throw new Error('Slide not found');
  }
  res.json({ message: 'Slide removed' });
});