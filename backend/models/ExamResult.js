import mongoose from "mongoose";

const ExamResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  questionResults: [
    {
      questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
      selectedAnswer: { type: String, required: true },
      correctAnswer: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

export default mongoose.model("ExamResult", ExamResultSchema);
