import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contentData from '../data/mockContent.js';
import Content from '../models/contentModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Content.deleteMany();
    console.log('Old content data destroyed!');
    await Content.create(contentData);
    console.log('New content data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();