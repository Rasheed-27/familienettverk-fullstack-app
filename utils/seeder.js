import mongoose from 'mongoose';
import dotenv from 'dotenv';
import slidesData from '../data/mockSlides.js';
import Slide from '../models/slideModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Slide.deleteMany();
    console.log('Old slides data destroyed!');
    await Slide.insertMany(slidesData);
    console.log('New slides data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();