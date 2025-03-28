import User from "../models/User.js";
import generateToken from "../utils/tokenGenerator.js";

export const registerUser = async (req, res) => {
  const { fullName, email, username, password } = req.body;

  try {
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ fullName, email, username, password });

    if (user) {
      generateToken(user, res); // Store token in HTTP-Only cookie

      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (user && (await user.matchPassword(password))) {
      generateToken(user, res); // Store token in HTTP-Only cookie

      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "strict", // Prevent CSRF attacks
      expires: new Date(0), // Expire cookie immediately
    });
    res.json({ message: "Logged out successfully" });
  };
  
  export const getUserProfile = (req, res) => {
    if (req.user) {
        res.json({
            _id: req.user._id,
            fullName: req.user.fullName,
            email: req.user.email,
            username: req.user.username,
        });
    } else {
        res.status(404).json({ message: "User not found" });
    }
};
