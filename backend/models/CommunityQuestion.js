import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  tags: [{ type: String }],

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Track who posted

  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track users who upvoted
  downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track users who downvoted

  answers: [
    {
      text: { type: String, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Track who answered
      createdAt: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now } // Automatically store creation time
});

export default mongoose.model("CommunityQuestion", QuestionSchema);
