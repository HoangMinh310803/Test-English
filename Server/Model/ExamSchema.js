const mongoose = require("mongoose");
const Question = require("./QuestionSchema");
const User = require("./UserSchema");
const { Schema } = mongoose;
const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  created_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  duration: {
    type: Number, // đơn vị phút
    required: true,
    default: 15,
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Exam", examSchema);
