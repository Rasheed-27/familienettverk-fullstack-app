import Activity from '../models/activityModel.js';
import asyncHandler from 'express-async-handler';

// GET /api/activities
export const getActivities = asyncHandler(async (req, res) => {
  let activities = await Activity.findOne();
  if (!activities) {
    activities = await new Activity({ photos: [], videos: [] }).save();
  }
  res.json(activities);
});

// POST /api/activities/photos
export const addPhoto = asyncHandler(async (req, res) => {
  const activities = await Activity.findOne();
  activities.photos.push(req.body);
  await activities.save();
  res.status(201).json(activities);
});

// DELETE /api/activities/photos/:photoId
export const deletePhoto = asyncHandler(async (req, res) => {
  const activities = await Activity.findOne();
  activities.photos.id(req.params.photoId).deleteOne();
  await activities.save();
  res.json(activities);
});

// POST /api/activities/videos
export const addVideo = asyncHandler(async (req, res) => {
  const activities = await Activity.findOne();
  activities.videos.push(req.body);
  await activities.save();
  res.status(201).json(activities);
});

// DELETE /api/activities/videos/:videoId
export const deleteVideo = asyncHandler(async (req, res) => {
  const activities = await Activity.findOne();
  activities.videos.id(req.params.videoId).deleteOne();
  await activities.save();
  res.json(activities);
});