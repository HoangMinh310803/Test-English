const Exam = require("../Model/ExamSchema");
// const Question = require("../Model/QuestionSchema");

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

    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy chi tiết đề thi" });
  }
};

module.exports = { getAllExams, getExamWithQuestions };
