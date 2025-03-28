import express from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUserProfile 
} from "../controllers/userController.js"; 
import { protect } from "../middlewares/authMiddleware.js"; // Ensure JWT is read from cookies

const router = express.Router();

// Authentication routes
router.post("/register", registerUser);  // Register user
router.post("/login", loginUser);        // Login user
router.post("/logout", protect, logoutUser); // Logout (protected, optional)

// Profile route (protected)
router.get("/profile", protect, getUserProfile); 

export default router;
