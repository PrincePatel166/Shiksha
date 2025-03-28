import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    message: { type: String, required: true },
    category: {
      type: String,
      enum: ["General Query", "Bug Report", "Feature Request", "Other"],
      required: true,
    },
    isAnonymous: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
