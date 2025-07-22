const mongoose = require("mongoose");
const User = require("./UserSchema");
const Exam = require("./ExamSchema");
const { Schema } = mongoose;

const resultSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  exam_id: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
  score: { type: Number, required: true },
  completed_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
