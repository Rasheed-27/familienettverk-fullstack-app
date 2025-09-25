import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// استيراد كل المسارات
import slideRoutes from './routes/slideRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import statRoutes from './routes/statRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import contentRoutes from './routes/contentRoutes.js';

// --- الإعدادات ---
dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

// --- استخدام مسارات API ---
app.use('/api/slides', slideRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/content', contentRoutes);


// --- خدمة الواجهة الأمامية (الجزء الجديد والحاسم) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// اجعل مجلد 'public' ثابتًا ويمكن الوصول إليه
app.use(express.static(path.join(__dirname, 'public')));

// لأي طلب آخر لا يتطابق مع المسارات أعلاه، أرسل ملف index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
});
// ------------------------------------------

// --- وسيط الأخطاء ---
app.use(notFound);
app.use(errorHandler);

// --- تشغيل الخادم ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});