import express from "express";
import { createCommunityAnswer, getCommunityAnswers, upvoteCommunityAnswer, downvoteCommunityAnswer } from "../controllers/communityAnswerController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createCommunityAnswer);
router.get("/:questionId", getCommunityAnswers);
router.put("/upvote/:id", protect, upvoteCommunityAnswer);
router.put("/downvote/:id", protect, downvoteCommunityAnswer);

export default router;
