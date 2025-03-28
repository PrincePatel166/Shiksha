import express from "express";
import { getSubjectNames } from "../controllers/subjectNameController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getSubjectNames);

export default router;
