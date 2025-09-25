// utils/statsSeeder.cjs (بصيغة CommonJS)

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// استدعاء الملفات التي سنحتاجها
const statsData = require('../data/mockStats.js');
// سنحتاج إلى إنشاء نموذج Stat بصيغة CommonJS أيضًا
const Stat = require('../models/statModel.cjs');
const connectDB = require('../config/db.js');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Stat.deleteMany();
    console.log('Old stats data destroyed!');
    await Stat.insertMany(statsData);
    console.log('New stats data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();