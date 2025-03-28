import Question from "../models/CommunityQuestion.js";

// ✅ Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("userId", "fullName") // Populate question author
      .populate("upvotes", "username") // Populate upvoters' usernames
      .populate("downvotes", "username") // Populate downvoters' usernames
      .exec();

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions", details: error.message });
  }
};


// ✅ Get a single question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("userId", "username") // Fetch the username of the question poster
      .populate("answers.userId", "username"); // Fetch the username of the answer authors

    if (!question) return res.status(404).json({ error: "Question not found" });

    res.json(question);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch question details", details: error.message });
  }
};


// ✅ Create a new question
export const createQuestion = async (req, res) => {
  try {
    const { title, details, tags = "" } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const newQuestion = new Question({
      title,
      details,
      tags: tags.length > 0 ? tags.split(",") : [],
      userId: req.user._id, // Ensure authentication
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to create question", details: error.message });
  }
};

// ✅ Upvote or downvote a question
export const voteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body;
    const userId = req.user._id; // Assuming `req.user` is set from authentication middleware

    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    // Handle upvote
    if (type === "upvote") {
      if (question.upvotes.includes(userId)) {
        question.upvotes.pull(userId); // Remove upvote if already exists
      } else {
        question.upvotes.push(userId);
        question.downvotes.pull(userId); // Remove downvote if exists
      }
    }
    
    // Handle downvote
    if (type === "downvote") {
      if (question.downvotes.includes(userId)) {
        question.downvotes.pull(userId); // Remove downvote if already exists
      } else {
        question.downvotes.push(userId);
        question.upvotes.pull(userId); // Remove upvote if exists
      }
    }

    await question.save();

    // Populate `username` of users who upvoted/downvoted
    await question.populate("upvotes", "username");
    await question.populate("downvotes", "username");

    res.json({
      upvotes: question.upvotes,
      downvotes: question.downvotes,
    });
  } catch (error) {
    res.status(500).json({ error: "Error processing vote", details: error.message });
  }
};


// ✅ Add an answer to a question
export const answerQuestion = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: User not authenticated" });
    }

    const { text } = req.body;
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    question.answers.push({ text, userId: req.user._id });
    await question.save();

    // Populate the answers before sending response
    const updatedQuestion = await Question.findById(req.params.id).populate("answers.userId", "fullName");

    res.json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: "Failed to add answer", details: error.message });
  }
};

