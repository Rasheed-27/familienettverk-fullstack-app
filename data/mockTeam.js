// familienettverk-backend/data/mockTeam.js

const teamData = [
  {
    fullName: "علي حسن",
    email: "ali.hassan@example.com",
    password: "password123",
    title: { ar: "المدير التنفيذي", en: "Executive Director", no: "Daglig leder" },
    imageUrl: "https://i.pravatar.cc/300?u=ali",
    isApproved: true,
  },
  {
    fullName: "فاطمة أحمد",
    email: "fatima.ahmed@example.com",
    password: "password123",
    title: { ar: "منسقة البرامج", en: "Program Coordinator", no: "Programkoordinator" },
    imageUrl: "https://i.pravatar.cc/300?u=fatima",
    isApproved: true,
  },
  {
    fullName: "خالد إبراهيم",
    email: "khalid.ibrahim@example.com",
    password: "password123",
    title: { ar: "مسؤول المتطوعين", en: "Volunteer Officer", no: "Frivillighetsansvarlig" },
    imageUrl: "https://i.pravatar.cc/300?u=khalid",
    isApproved: true,
  },
  {
    fullName: "سارة عبدالله",
    email: "sara.abdullah@example.com",
    password: "password123",
    title: { ar: "متطوعة", en: "Volunteer", no: "Frivillig" },
    imageUrl: "https://i.pravatar.cc/300?u=sara",
    isApproved: false, // سنجعلها غير موافق عليها للتجربة
  }
];

// استخدام module.exports لأنه سيتم استدعاؤه من سكريبت CommonJS
export default teamData;