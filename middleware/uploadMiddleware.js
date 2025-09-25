import multer from 'multer';

// إعداد Multer لتخزين الملف المرفوع مؤقتًا في الذاكرة
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;