import Question from "../models/Question.js";
import ExamResult from "../models/ExamResult.js";
import Subject from "../models/Subject.js";
import Topic from "../models/Topic.js";

// Get all subjects
export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find().select("name");

    if (!subjects.length) {
      return res.status(404).json({ error: "No subjects found" });
    }

    res.json({ subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get topics by subject
export const getTopicsBySubject = async (req, res) => {
    try {
      const { subjectId } = req.params;
  
      if (!subjectId) {
        return res.status(400).json({ error: "Subject ID is required" });
      }
  
      // Ensure subjectId matches MongoDB ObjectId format if applicable
      if (!/^[a-fA-F0-9]{24}$/.test(subjectId)) {
        return res.status(400).json({ error: "Invalid subject ID format" });
      }
  
      const topics = await Topic.find({ subject: subjectId }).select("title");
  
      if (!topics.length) {
        return res.status(404).json({ error: "No topics found for this subject" });
      }
  
      res.json({ topics });
    } catch (error) {
      console.error("Error fetching topics:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
// Get questions based on filters
export const getQuestions = async (req, res) => {
  try {
    const { subject, topic, types } = req.body;

    if (!subject || !topic) {
      return res.status(400).json({ error: "Subject and topic are required" });
    }

    const filters = { subject, topic };

    if (Array.isArray(types) && types.length > 0) {
      filters.type = { $in: types };
    }

    const questions = await Question.find(filters);

    if (!questions.length) {
      return res.status(404).json({ error: "No questions found" });
    }

    res.json({ questions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// // Submit exam
// import Question from "../models/Question.js";
// import ExamResult from "../models/ExamResult.js";

export const submitExam = async (req, res) => {
    try {
      const { answers, subject, topic } = req.body;
  
      if (!answers || !subject || !topic) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // Fetch user ID from the authenticated request (assuming authMiddleware sets req.user)
      const userId = req.user?._id;
      if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      // Fetch questions for the selected subject and topic
      const questions = await Question.find({ subject, topic });
  
      if (!questions.length) {
        return res.status(404).json({ error: "No questions found for this subject and topic" });
      }
  
      let score = 0;
      let questionResults = [];
  
      questions.forEach((q) => {
        const questionId = q._id.toString();
        const selectedAnswer = answers[questionId] || ""; // Default to empty if no answer
  
        const isCorrect = selectedAnswer === q.correctAnswer;
        if (isCorrect) score++;
  
        questionResults.push({
          questionId: q._id, // Ensure it's stored as an ObjectId
          selectedAnswer,
          correctAnswer: q.correctAnswer,
          isCorrect,
        });
      });
  
      // Save exam result in the database
      const result = new ExamResult({
        user: userId,
        subject,
        topic,
        score,
        totalQuestions: questions.length,
        questionResults,
      });
  
      await result.save();
  
      res.status(201).json({
        message: "Exam submitted successfully",
        totalQuestions: questions.length,
        score,
        questionResults,
      });
    } catch (error) {
      console.error("Error submitting exam:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  export const getExamHistory = async (req, res) => {
    try {
      const exams = await ExamResult.find({ user: req.user.id })
        .select("-questionResults") // Exclude detailed question data in history list
        .sort({ createdAt: -1 });
  
      res.json({ exams });
    } catch (error) {
      res.status(500).json({ message: "Error fetching exam history." });
    }
  };
  
  // Fetch a specific exam by ID
  export const getExamById = async (req, res) => {
    try {
      const exam = await ExamResult.findOne({ _id: req.params.id, user: req.user.id });
  
      if (!exam) return res.status(404).json({ message: "Exam not found." });
  
      res.json(exam);
    } catch (error) {
      res.status(500).json({ message: "Error fetching exam details." });
    }
  };
  
  // Delete an exam
  export const deleteExam = async (req, res) => {
    try {
      const exam = await ExamResult.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  
      if (!exam) return res.status(404).json({ message: "Exam not found." });
  
      res.json({ message: "Exam deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error deleting exam." });
    }
  };