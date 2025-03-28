import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

export const submitFeedback = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { message, category, isAnonymous, username } = req.body;

    if (!message || !category) {
      return res.status(400).json({ message: "Message and category are required." });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const feedback = new Feedback({
      userId: req.user._id,
      username: isAnonymous ? "Anonymous" : username || user.username,
      message,
      category,
      isAnonymous,
    });

    await feedback.save();
    res.status(201).json({ feedback });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("userId", "username email");
    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
