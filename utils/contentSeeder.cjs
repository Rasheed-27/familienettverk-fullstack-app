const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contentData = require('../data/mockContent.cjs');
const Content = require('../models/contentModel.cjs');
const connectDB = require('../config/db.cjs');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Content.deleteMany();
    console.log('Old content destroyed!');
    await Content.create(contentData);
    console.log('New content imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
importData();