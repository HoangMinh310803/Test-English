const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
  _id: false, // Tùy chọn: giữ id tự sinh hoặc không
  id: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D"],
  },
  text: {
    type: String,
    required: true,
  },
});

const questionSchema = new mongoose.Schema({
  question_text: { type: String, required: true },
  options: {
    type: [optionSchema],
    validate: [(arr) => arr.length === 4, "Phải có đúng 4 lựa chọn"],
  },
  correct_answer: {
    type: String,
    enum: ["A", "B", "C", "D"],
    required: true,
  },
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionSchema);
