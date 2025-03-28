// import express from "express";
// import cors from "cors";
// const app = express();

// app.use(cors()); // Enable Cross-Origin Resource Sharing
// app.use(express.json()); // Parse incoming JSON requests

// // Mock data
// const subjects = [
//   { id: 1, name: "Mathematics" },
//   { id: 2, name: "Science" },
//   { id: 3, name: "History" },
// ];

// const topics = [
//   { id: 1, subject: "Mathematics", title: "Algebra", description: "Algebra is the study of mathematical symbols and the rules for manipulating them." },
//   { id: 2, subject: "Mathematics", title: "Calculus", description: "Calculus is a branch of mathematics focused on limits, functions, derivatives, integrals, and infinite series." },
//   { id: 3, subject: "Science", title: "Physics", description: "Physics is the natural science that studies matter, its motion and behavior through space and time." },
//   { id: 4, subject: "Science", title: "Chemistry", description: "Chemistry is the branch of science concerned with the substances of which matter is composed." },
//   { id: 5, subject: "History", title: "Ancient History", description: "Ancient history covers the time period from the beginning of written records to the post-classical history era." },
// ];

// // API endpoints

// // Get all subjects
// app.get("/api/subjects", (req, res) => {
//   res.json(subjects);
// });

// // Get all topics
// app.get("/api/topics", (req, res) => {
//   res.json(topics);
// });

// // Start the server
// const PORT = 5000; // You can change this to any port you prefer
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// import express from 'express';
// import cors from "cors";
// import bodyParser from 'body-parser';

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Sample data
// const subjects = ["Mathematics", "Science", "History"];
// const topics = {
//   Mathematics: ["Algebra", "Geometry", "Trigonometry"],
//   Science: ["Physics", "Chemistry", "Biology"],
//   History: ["Ancient", "Medieval", "Modern"],
// };
// const questions = {
//   Algebra: [
//     {
//       id: "q1",
//       question: "What is the value of x if 2x + 5 = 15?",
//       type: "numeric",
//       options: [],
//       answer: "5",
//     },
//     {
//       id: "q2",
//       question: "Which of the following is a quadratic equation?",
//       type: "mcq",
//       options: ["x + 2 = 0", "x^2 - 3x + 2 = 0", "2x + 5 = 15", "x - 5 = 0"],
//       answer: "x^2 - 3x + 2 = 0",
//     },
//   ],
//   Geometry: [
//     {
//       id: "q3",
//       question: "What is the sum of the angles in a triangle?",
//       type: "numeric",
//       options: [],
//       answer: "180",
//     },
//     {
//       id: "q4",
//       question: "What is the value of pie in nearby integer?",
//       type: "numeric",
//       options: [],
//       answer: "3",
//     },
//   ],
// };

// // Routes
// app.get("/api/subjects", (req, res) => {
//   res.json({ subjects });
// });

// app.get("/api/topics", (req, res) => {
//   const { subject } = req.query;
//   if (topics[subject]) {
//     res.json({ topics: topics[subject] });
//   } else {
//     res.status(404).json({ error: "Subject not found" });
//   }
// });

// app.post("/api/questions", (req, res) => {
//   const { topic } = req.body;
//   if (questions[topic]) {
//     res.json({ questions: questions[topic] });
//   } else {
//     res.status(404).json({ error: "Topic not found" });
//   }
// });

// app.post("/api/submitExam", (req, res) => {
//   const { answers } = req.body;
//   let score = 0;
//   let totalQuestions = 0;

//   // Check answers
//   for (const topic in questions) {
//     questions[topic].forEach((q) => {
//       totalQuestions++;
//       if (answers[q.id] && answers[q.id].toString() === q.answer.toString()) {
//         score++;
//       }
//     });
//   }

//   res.json({
//     message: "Exam submitted successfully!",
//     score,
//     totalQuestions,
//   });
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Mock server running on http://localhost:${PORT}`);
// });

// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// let questions = [
//   {
//     _id: "1",
//     title: "What is React?",
//     description: "React is a JavaScript library for building user interfaces.",
//     tags: ["React", "JavaScript"],
//     answers: [
//       { _id: "101", text: "React is a front-end library developed by Facebook." },
//       { _id: "102", text: "It helps in building reusable UI components." },
//     ],
//     upvotes: 0,
//     downvotes: 0,
//   },
//   {
//     _id: "2",
//     title: "What is Node.js?",
//     description: "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
//     tags: ["Node.js", "Backend"],
//     answers: [
//       { _id: "201", text: "Node.js is used for building scalable network applications." },
//       { _id: "202", text: "It runs JavaScript code on the server." },
//     ],
//     upvotes: 0,
//     downvotes: 0,
//   },
// ];

// // Get all questions
// app.get("/api/questions", (req, res) => {
//   res.json({ questions });
// });

// // Post new question
// app.post("/api/questions", (req, res) => {
//   const newQuestion = { ...req.body, _id: Date.now().toString(), answers: [], upvotes: 0, downvotes: 0 };
//   questions.push(newQuestion);
//   res.json({ message: "Question added successfully.", question: newQuestion });
// });

// // Get specific question by ID
// app.get("/api/questions/:id", (req, res) => {
//   const questionId = req.params.id;
//   const question = questions.find((q) => q._id === questionId);
//   if (!question) return res.status(404).json({ message: "Question not found" });
//   res.json({ question });
// });

// // Post new answer for a specific question
// // Post new answer for a specific question
// app.post("/api/answer/:id", (req, res) => {
//   const questionId = req.params.id;
//   const question = questions.find((q) => q._id === questionId);
//   if (!question) return res.status(404).json({ message: "Question not found" });

//   const newAnswer = { text: req.body.text, _id: Date.now().toString(), upvotes: 0 }; // Added upvotes property
//   question.answers.push(newAnswer);
//   res.json({ message: "Answer added successfully.", answer: newAnswer });
// });


// // Upvote and downvote actions
// app.post("/api/questions/:id/:action", (req, res) => {
//   const { id, action } = req.params;
//   const question = questions.find((q) => q._id === id);
//   if (!question) return res.status(404).json({ message: "Question not found" });

//   if (action === "upvote") question.upvotes += 1;
//   if (action === "downvote") question.downvotes += 1;

//   res.json({ message: `${action} successful`, question });
// });

// app.post("/api/answers/:answerId/:action", (req, res) => {
//   const { answerId, action } = req.params;
  
//   let answerFound = false;
//   questions.forEach((question) => {
//     question.answers.forEach((answer) => {
//       if (answer._id === answerId) {
//         if (action === "upvote") answer.upvotes += 1;
//         if (action === "downvote") answer.downvotes += 1;
//         answerFound = true;
//       }
//     });
//   });

//   if (!answerFound) {
//     return res.status(404).json({ message: "Answer not found" });
//   }

//   res.json({ message: `${action} successful` });
// });

// app.listen(5000, () => console.log("Server running on http://localhost:5000"));
// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Sample questions with answers
// let questions = [
//   {
//     _id: "1",
//     title: "What is React?",
//     description: "React is a JavaScript library for building user interfaces.",
//     tags: ["React", "JavaScript"],
//     answers: [
//       { _id: "101", text: "React is a front-end library developed by Facebook.", votes: 0 },
//       { _id: "102", text: "It helps in building reusable UI components.", votes: 0 },
//     ],
//   },
//   {
//     _id: "2",
//     title: "What is Node.js?",
//     description: "Node.js is a JavaScript runtime built on Chrome's V8 engine.",
//     tags: ["Node.js", "Backend"],
//     answers: [
//       { _id: "201", text: "Node.js is used for building scalable network applications.", votes: 0 },
//       { _id: "202", text: "It runs JavaScript code on the server.", votes: 0 },
//     ],
//   },
// ];

// // Get all questions
// app.get("/api/questions", (req, res) => {
//   res.json({ questions });
// });

// // Post a new question
// app.post("/api/questions", (req, res) => {
//   const newQuestion = {
//     ...req.body,
//     _id: Date.now().toString(),
//     answers: [],
//   };
//   questions.push(newQuestion);
//   res.json({ message: "Question added successfully.", question: newQuestion });
// });

// // Get a specific question by ID
// app.get("/api/questions/:id", (req, res) => {
//   const questionId = req.params.id;
//   const question = questions.find((q) => q._id === questionId);
//   if (!question) return res.status(404).json({ message: "Question not found" });
//   res.json({ question });
// });

// // Post a new answer for a specific question
// app.post("/api/answers/:questionId", (req, res) => {
//   const { questionId } = req.params;
//   const question = questions.find((q) => q._id === questionId);
//   if (!question) return res.status(404).json({ message: "Question not found" });

//   const newAnswer = { _id: Date.now().toString(), text: req.body.text, votes: 0 };
//   question.answers.push(newAnswer);
//   res.json({ message: "Answer added successfully.", answer: newAnswer });
// });

// // Upvote & Downvote for Answers
// app.post("/api/answers/:answerId/vote", (req, res) => {
//   const { answerId } = req.params;
//   const { type } = req.body; // Expecting "upvote" or "downvote"

//   let answerFound = false;

//   // Iterate over all questions to find the answer
//   questions.forEach((question) => {
//     question.answers.forEach((answer) => {
//       if (answer._id === answerId) {
//         if (type === "upvote") answer.votes += 1;
//         if (type === "downvote") answer.votes -= 1;
//         answerFound = true;
//         res.json({ message: `${type} successful`, votes: answer.votes });
//       }
//     });
//   });

//   if (!answerFound) {
//     return res.status(404).json({ message: "Answer not found" });
//   }
// });

// // Start the server
// app.listen(5000, () => console.log("Server running on http://localhost:5000"));

// import express from "express";
// import cors from "cors";

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Mock data for testing
// let feedbacks = [
//   {
//     _id: "1",
//     category: "Bug Report",
//     message: "The login button is not working.",
//     username: "JohnDoe",
//     isAnonymous: false,
//   },
//   {
//     _id: "2",
//     category: "Feature Request",
//     message: "Please add a dark mode option.",
//     username: "Anonymous",
//     isAnonymous: true,
//   },
// ];

// // Endpoint to get all feedback
// app.get("/api/feedback", (req, res) => {
//   const { category } = req.query;

//   // Filter by category if provided
//   if (category) {
//     const filteredFeedbacks = feedbacks.filter(
//       (feedback) => feedback.category === category
//     );
//     return res.json({ feedbacks: filteredFeedbacks });
//   }

//   res.json({ feedbacks });
// });

// // Endpoint to add new feedback
// app.post("/api/feedback", (req, res) => {
//   const { message, username, category, isAnonymous } = req.body;

//   // Validation for required fields
//   if (!message || !category) {
//     return res.status(400).json({ message: "Message and category are required." });
//   }

//   if (!isAnonymous && (!username || username.trim() === "")) {
//     return res
//       .status(400)
//       .json({ message: "Username is required when not submitting anonymously." });
//   }

//   // Create new feedback
//   const newFeedback = {
//     _id: Date.now().toString(),
//     message,
//     username: isAnonymous ? "Anonymous" : username.trim(),
//     category,
//     isAnonymous,
//   };

//   feedbacks.push(newFeedback);
//   res.json({ message: "Feedback submitted successfully.", feedback: newFeedback });
// });

// // Endpoint to delete feedback (admin functionality)
// app.delete("/api/feedback/:id", (req, res) => {
//   const { id } = req.params;
//   const feedbackIndex = feedbacks.findIndex((feedback) => feedback._id === id);

//   if (feedbackIndex === -1) {
//     return res.status(404).json({ message: "Feedback not found." });
//   }

//   feedbacks.splice(feedbackIndex, 1);
//   res.json({ message: "Feedback deleted successfully." });
// });

// app.listen(5000, () => console.log("Server running on http://localhost:5000"));
// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());



// // Initial data
// const subjects = ["Mathematics", "Science", "History"];
// const topics = {
//   Mathematics: ["Algebra", "Geometry", "Trigonometry"],
//   Science: ["Physics", "Chemistry", "Biology"],
//   History: ["Ancient", "Medieval", "Modern"],
// };
// const questions = {
//   Algebra: [
//     {
//       id: "q1",
//       question: "What is the value of x if 2x + 5 = 15?",
//       type: "numeric",
//       options: [],
//       answer: "5",
//     },
//     {
//       id: "q2",
//       question: "Which of the following is a quadratic equation?",
//       type: "mcq",
//       options: ["x + 2 = 0", "x^2 - 3x + 2 = 0", "2x + 5 = 15", "x - 5 = 0"],
//       answer: "x^2 - 3x + 2 = 0",
//     },
//   ],
//   Geometry: [
//     {
//       id: "q3",
//       question: "What is the sum of the angles in a triangle?",
//       type: "numeric",
//       options: [],
//       answer: "180",
//     },
//     {
//       id: "q4",
//       question: "What is the value of pie in nearby integer?",
//       type: "numeric",
//       options: [],
//       answer: "3",
//     },
//   ],
// };

// // Initial exam history
// let examHistory = [
//   {
//     id: 1,
//     name: "Mathematics - Chapter 1",
//     date: "2025-02-15",
//     score: 85,
//     details: {
//       attempted: 40,
//       unattempted: 10,
//       correct: 35,
//       incorrect: 5,
//       topicAnalysis: {
//         Algebra: "Strong",
//         Geometry: "Moderate",
//         Calculus: "Weak",
//       },
//     },
//   },
// ];

// // Routes
// app.get("/api/subjects", (req, res) => {
//   res.json({ subjects });
// });

// app.get("/api/topics", (req, res) => {
//   const { subject } = req.query;
//   if (topics[subject]) {
//     res.json({ topics: topics[subject] });
//   } else {
//     res.status(404).json({ error: "Subject not found" });
//   }
// });

// app.post("/api/questions", (req, res) => {
//   const { topic } = req.body;
//   if (questions[topic]) {
//     res.json({ questions: questions[topic] });
//   } else {
//     res.status(404).json({ error: "Topic not found" });
//   }
// });

// // Submit an exam
// app.post("/api/submitExam", (req, res) => {
//   const { answers, date, subject,topic } = req.body;
//   if (!subject || !topic) {
//     return res.status(400).json({ message: "Subject and topic are required" });
//   }
//   let examName=`${subject}-${topic}`
//   let score = 0;
//   let totalQuestions = 0;
//   let attempted = 0;
//   let correct = 0;
//   let incorrect = 0;

//   // Check answers
//   for (const topic in questions) {
//     questions[topic].forEach((q) => {
//       totalQuestions++;
//       if (answers[q.id]) {
//         attempted++;
//         if (answers[q.id].toString() === q.answer.toString()) {
//           score++;
//           correct++;
//         } else {
//           incorrect++;
//         }
//       }
//     });
//   }

//   const unattempted = totalQuestions - attempted;

//   // Generate topic analysis
//   const topicAnalysis = {};
//   for (const topic in questions) {
//     const totalTopicQuestions = questions[topic].length;
//     const correctTopicQuestions = questions[topic].filter(
//       (q) => answers[q.id] && answers[q.id].toString() === q.answer.toString()
//     ).length;

//     if (correctTopicQuestions / totalTopicQuestions >= 0.7) {
//       topicAnalysis[topic] = "Strong";
//     } else if (correctTopicQuestions / totalTopicQuestions >= 0.4) {
//       topicAnalysis[topic] = "Moderate";
//     } else {
//       topicAnalysis[topic] = "Weak";
//     }
//   }

//   // Create exam report
//   const examReport = {
//     id: examHistory.length + 1,
//     name: examName,
//     date: date || new Date().toISOString().split("T")[0],
//     score: Math.round((score / totalQuestions) * 100),
//     details: {
//       attempted,
//       unattempted,
//       correct,
//       incorrect,
//       topicAnalysis,
//     },
//   };

//   // Add to history
//   examHistory.push(examReport);

//   res.json({
//     message: "Exam submitted successfully!",
//     examReport,
//   });
// });

// // Get all exams
// app.get("/api/exams", (req, res) => {
//   res.json({ exams: examHistory });
// });

// // Get a specific exam by ID
// app.get("/api/exams/:id", (req, res) => {
//   const { id } = req.params;
//   const exam = examHistory.find((exam) => exam.id === parseInt(id));
//   if (exam) {
//     res.json({ exam });
//   } else {
//     res.status(404).json({ message: "Exam not found" });
//   }
// });

// // Delete an exam by ID
// app.delete("/api/exams/:id", (req, res) => {
//   const { id } = req.params;
//   const initialLength = examHistory.length;
//   examHistory = examHistory.filter((exam) => exam.id !== parseInt(id));

//   if (examHistory.length < initialLength) {
//     res.json({ message: "Exam deleted successfully" });
//   } else {
//     res.status(404).json({ message: "Exam not found" });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; // Import cookie-parser
import cors from "cors";
import connectDB from "./config/db.js";

// Import route files
import userRoutes from "./routes/user.routes.js";
import subjectRoutes from "./routes/subject.routes.js";
import topicRoutes from "./routes/topic.routes.js";
import examRoutes from "./routes/exam.routes.js";
import communityQuestionRoutes from "./routes/communityQuestion.routes.js";
// import communityAnswerRoutes from "./routes/communityAnswer.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import subjectNameRoutes from "./routes/subjectname.routes.js";
import topicNameRoutes from "./routes/topicname.routes.js";

dotenv.config();
connectDB();

const app = express();

// CORS Configuration
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend
  credentials: true, // Allow cookies and authentication headers
}));

app.use(express.json());
app.use(cookieParser()); // Enable cookie support

// Define Routes
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes); // Add topics API
app.use("/api/exams", examRoutes);
app.use("/api/community/questions", communityQuestionRoutes);
// app.use("/api/community/answers", communityAnswerRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/subjectname", subjectNameRoutes);
app.use("/api/topicname", topicNameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
