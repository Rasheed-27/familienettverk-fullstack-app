import mongoose from 'mongoose';
import dotenv from 'dotenv';
import statsData from '../data/mockStats.js';
import Stat from '../models/statModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Stat.deleteMany();
    console.log('Old stats data destroyed!');
    await Stat.insertMany(statsData);
    console.log('New stats data imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();