import express from "express";
import { getTopics } from "../controllers/topicController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Change isAuthenticated to protect

const router = express.Router();
router.get("/", protect, getTopics); // Change isAuthenticated to protect

export default router;
