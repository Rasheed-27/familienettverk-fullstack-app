import Stat from '../models/statModel.js';
import asyncHandler from 'express-async-handler';

export const getStats = asyncHandler(async (req, res) => {
  const stats = await Stat.find({}).sort({ order: 'asc' });
  res.json(stats);
});

export const updateStats = asyncHandler(async (req, res) => {
  const statsData = req.body;
  const updatePromises = statsData.map(statItem =>
    Stat.findByIdAndUpdate(statItem._id, statItem, { new: true })
  );
  const updatedStats = await Promise.all(updatePromises);
  res.json(updatedStats);
});