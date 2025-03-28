import CommunityAnswer from "../models/CommunityAnswer.js";

// ✅ Create a Community Answer
export const createCommunityAnswer = async (req, res) => {
  try {
    const { questionId, text } = req.body;
    const answer = new CommunityAnswer({ questionId, text, userId: req.user.id });
    await answer.save();
    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: "Failed to create community answer" });
  }
};

// ✅ Get Answers for a Community Question
export const getCommunityAnswers = async (req, res) => {
  try {
    const answers = await CommunityAnswer.find({ questionId: req.params.questionId }).populate("userId", "username");
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch community answers" });
  }
};

// ✅ Upvote a Community Answer
export const upvoteCommunityAnswer = async (req, res) => {
  try {
    const answer = await CommunityAnswer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found" });

    answer.downvotes = answer.downvotes.filter(id => id.toString() !== req.user.id);
    
    if (answer.upvotes.includes(req.user.id)) {
      answer.upvotes = answer.upvotes.filter(id => id.toString() !== req.user.id);
    } else {
      answer.upvotes.push(req.user.id);
    }

    await answer.save();
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: "Failed to upvote" });
  }
};

// ✅ Downvote a Community Answer
export const downvoteCommunityAnswer = async (req, res) => {
  try {
    const answer = await CommunityAnswer.findById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found" });

    answer.upvotes = answer.upvotes.filter(id => id.toString() !== req.user.id);
    
    if (answer.downvotes.includes(req.user.id)) {
      answer.downvotes = answer.downvotes.filter(id => id.toString() !== req.user.id);
    } else {
      answer.downvotes.push(req.user.id);
    }

    await answer.save();
    res.json(answer);
  } catch (error) {
    res.status(500).json({ error: "Failed to downvote" });
  }
};
