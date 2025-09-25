import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// استيراد كل المسارات
import slideRoutes from './routes/slideRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import statRoutes from './routes/statRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// --- الإعدادات الأولية ---
dotenv.config();
connectDB();
const app = express();

// --- استخدام الوسائط (Middleware) العامة ---
app.use(cors());
app.use(express.json());


// --- 1. استخدام مسارات API (هذا يجب أن يأتي أولاً) ---
app.use('/api/slides', slideRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/content', contentRoutes);


// --- 2. خدمة الواجهة الأمامية (الجزء الخاص بالإنتاج) ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// في بيئة الإنتاج، نخدم الملفات المبنية من مجلد 'public'
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  // أي طلب لا يطابق API أعلاه، يتم إرجاع تطبيق React
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
  );
} else {
  // في بيئة التطوير، نرسل فقط رسالة تأكيد
  app.get('/', (req, res) => {
    res.send('API is running for development...');
  });
}

// --- 3. وسيط معالجة الأخطاء (يجب أن يكون في النهاية) ---
app.use(notFound);
app.use(errorHandler);

// --- تشغيل الخادم ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});