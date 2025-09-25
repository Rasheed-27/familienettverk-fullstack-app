// وسيط للتعامل مع المسارات غير الموجودة (404)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// وسيط لمعالجة جميع الأخطاء الأخرى
const errorHandler = (err, req, res, next) => {
  // أحيانًا يأتي الخطأ بحالة نجاح (200)، لذا نغيرها إلى 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  res.status(statusCode).json({
    message: message,
    // نعرض تفاصيل الخطأ فقط في بيئة التطوير
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };