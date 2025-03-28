import express from "express";
import { getSubjects } from "../controllers/subjectController.js";
import { protect } from "../middlewares/authMiddleware.js"; // Change isAuthenticated to protect

const router = express.Router();
router.get("/", protect, getSubjects); // Change isAuthenticated to protect

export default router;
