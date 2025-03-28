import express from "express";
import { getTopicNames } from "../controllers/topicNameController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTopicNames);

export default router;
