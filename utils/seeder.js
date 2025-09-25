const mongoose = require('mongoose');
const dotenv = require('dotenv');
const slidesData = require('../data/mockSlides.js');
const Slide = require('../models/slideModel.js');
const connectDB = require('../config/db.js');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Slide.deleteMany();
    console.log('Old slides data destroyed!');

    await Slide.insertMany(slidesData);
    console.log('New slides data imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Slide.deleteMany();
    console.log('All slides data destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}