import express from 'express';
import multer from 'multer';
import asyncHandler from 'express-async-handler';
import { protect, admin } from '../middleware/authMiddleware.js';
import cloudinary from '../config/cloudinaryConfig.js'; // <-- التعريف الثاني هنا
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', protect, admin, upload.single('image'), asyncHandler(async (req, res) => {
    console.log("1. /api/upload route hit");

    if (!req.file) {
        console.log("2. No file received in req.file");
        res.status(400);
        throw new Error('No file uploaded');
    }

    console.log("2. File received:", req.file.originalname);

    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        
        console.log("3. Uploading to Cloudinary...");
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: 'familienettverk',
            resource_type: 'auto'
        });
        
        console.log("4. Upload successful. URL:", result.secure_url);
        res.status(200).json({ imageUrl: result.secure_url });

    } catch (error) {
        console.error("5. Cloudinary Upload Error:", error);
        res.status(500);
        throw new Error('Error uploading file to Cloudinary');
    }
}));

export default router;