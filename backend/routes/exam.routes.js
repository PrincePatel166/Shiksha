import express from "express";
import { getSubjects, getTopicsBySubject, getQuestions, submitExam } from "../controllers/examController.js";
import { getExamHistory, getExamById, deleteExam } from "../controllers/examController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/subjects", protect, getSubjects);
router.get("/topics/:subjectId", protect, getTopicsBySubject);
router.post("/questions", protect, getQuestions);
router.post("/submit", protect, submitExam);
router.get("/", protect, getExamHistory); // Fetch all exam history
router.get("/:id", protect, getExamById); // Fetch a specific exam
router.delete("/:id", protect, deleteExam); // Delete an exam

export default router;
