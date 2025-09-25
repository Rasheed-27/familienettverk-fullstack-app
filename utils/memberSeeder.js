import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import membersData from '../data/mockTeam.js';
import Member from '../models/memberModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();
    await Member.deleteMany();
    console.log('Old members data destroyed!');

    const membersWithHashedPasswords = await Promise.all(
      membersData.map(async (member) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(member.password, salt);
        return { ...member, password: hashedPassword };
      })
    );

    await Member.insertMany(membersWithHashedPasswords);
    console.log('New members data with HASHED passwords imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();