const express = require("express");
const router = express.Router();
const {
  getAllExams,
  getExamWithQuestions,
} = require("../controllers/examController");
const { verifyToken, isAdmin } = require("../Utils/authMiddleware");
const {
  createQuestion,
  createExam,
  getAllQuestions,
  saveResult,
} = require("../controllers/examController");
// GET /exams - lấy tất cả các đề thi
router.get("/api/all-exams", getAllExams);

// GET /exams/:id - lấy chi tiết 1 đề thi kèm danh sách câu hỏi
router.get("/api/exams/:id", getExamWithQuestions);

// POST /api/create/question - tạo cầu hỏi
router.post("/api/create/question", verifyToken, isAdmin, createQuestion);
// POST /api/create/exams - tạo đề thi
router.post("/api/create/exams", verifyToken, isAdmin, createExam);

// GET /api/questions - lấy tất cả các cầu hỏi
router.get("/api/questions", verifyToken, isAdmin, getAllQuestions);

// POST /api/save-result - lưu kết quả
router.post("/api/save-result", verifyToken, saveResult);

module.exports = router;
