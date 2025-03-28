import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  type: { type: String, enum: ["mcq", "numeric"], required: true },
  text: { type: String, required: true },
  options: { type: [String], required: function () { return this.type === "mcq"; } },
  correctAnswer: { type: String, required: true },
});

export default mongoose.model("Question", QuestionSchema);
