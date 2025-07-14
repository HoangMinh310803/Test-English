const Exam = require("../Model/ExamSchema");
const Question = require("../Model/QuestionSchema");

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
    const question = new Question({
      question_text,
      options,
      correct_answer,
      created_by: req.user._id,
    });
    await question.save();
    res.status(201).json({ message: "Tạo câu hỏi thành công", question });
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo câu hỏi", error: err.message });
  }
};

const createExam = async (req, res) => {
  try {
    const { title, description, questions } = req.body;
    const exam = new Exam({
      title,
      description,
      questions: questions,
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
    const questions = await Question.find({ created_by: req.user._id }); // chỉ lấy câu hỏi của user hiện tại (admin)
    res.json({ questions });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách câu hỏi" });
  }
};
module.exports = {
  getAllExams,
  getExamWithQuestions,
  createQuestion,
  createExam,
  getAllQuestions,
};
