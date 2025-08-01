const Exam = require("../Model/ExamSchema");
const Question = require("../Model/QuestionSchema");
const Result = require("../Model/ResultSchema");
const getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find().select("title description");
    res.json({ exams });
  } catch (error) {
    res.send({ error: error.message });
  }
};

const getExamWithQuestions = async (req, res) => {
  try {
    const examId = req.params.id;
    const exam = await Exam.findById(examId).populate("questions");

    if (!exam)
      return res.status(404).json({ message: "Không tìm thấy đề thi" });

    res.json({ exam });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy chi tiết đề thi" });
  }
};

const createQuestion = async (req, res) => {
  try {
    const { question_text, options, correct_answer } = req.body;

    if (!question_text || !options || options.length !== 4) {
      return res
        .status(400)
        .json({ message: "Thiếu dữ liệu hoặc không đủ 4 đáp án." });
    }

    const validLetters = ["A", "B", "C", "D"];
    if (!validLetters.includes(correct_answer)) {
      return res
        .status(400)
        .json({ message: "Đáp án đúng phải là A, B, C hoặc D" });
    }

    const newQuestion = new Question({
      question_text,
      options,
      correct_answer,
      created_by: req.user._id,
    });

    await newQuestion.save();
    res.status(201).json({ message: "Tạo câu hỏi thành công!" });
  } catch (error) {
    res.status(500).json({ message: error.message || "Lỗi server" });
  }
};

const createExam = async (req, res) => {
  try {
    const { title, description, questions, duration } = req.body;
    const exam = new Exam({
      title,
      description,
      questions: questions,
      duration,
      created_by: req.user._id,
    });
    await exam.save();
    res.status(201).json({ message: "Tạo đề thi thành công", exam });
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo đề thi", error: err.message });
  }
};
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ created_by: req.user._id });
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách câu hỏi" });
  }
};
const getAllHistoryExams = async (req, res) => {
  try {
    const results = await Result.find({ user_id: req.user._id })
      .populate("exam_id", "title")
      .sort({ completed_at: -1 });

    res.json({
      results: results.map((r) => ({
        exam_title: r.exam_id.title,
        score: r.score,
        completed_at: r.completed_at,
      })),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi lấy lịch sử bài thi", error: err.message });
  }
};

const saveResult = async (req, res) => {
  try {
    const userId = req.user.id; // từ middleware auth
    const { exam_id, score } = req.body;

    const newResult = new Result({
      user_id: userId,
      exam_id,
      score,
    });

    await newResult.save();
    res.status(201).json({ message: "Lưu kết quả thành công" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Lỗi khi lưu kết quả", error: err.message });
  }
};

module.exports = {
  getAllExams,
  getExamWithQuestions,
  createQuestion,
  createExam,
  getAllQuestions,
  saveResult,
  getAllHistoryExams,
};
