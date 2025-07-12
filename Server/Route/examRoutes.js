const express = require("express");
const router = express.Router();
const {
  getAllExams,
  getExamWithQuestions,
} = require("../controllers/examController");

// GET /exams - lấy tất cả các đề thi
router.get("/api/all-exams", getAllExams);

// GET /exams/:id - lấy chi tiết 1 đề thi kèm danh sách câu hỏi
router.get("/api/exams/:id", getExamWithQuestions);

module.exports = router;
