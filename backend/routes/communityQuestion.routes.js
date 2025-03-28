import express from "express";
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  voteQuestion,
  answerQuestion,
} from "../controllers/communityQuestionController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getQuestions);
router.get("/:id", getQuestionById);
router.post("/", protect, createQuestion);
router.put("/:id/vote", protect, voteQuestion);
router.post("/:id/answer", protect, answerQuestion);

export default router;
