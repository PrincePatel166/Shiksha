import mongoose from "mongoose";
import dotenv from "dotenv";
import Subject from "./models/Subject.js";
import Topic from "./models/Topic.js";
import Question from "./models/Question.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const seedDatabase = async () => {
  try {
    console.log("Seeding database...");

    // Clear existing data
    await Subject.deleteMany();
    await Topic.deleteMany();
    await Question.deleteMany();

    console.log("Existing data cleared.");

    // Insert Subjects
    const subjects = await Subject.insertMany([
      { name: "Mathematics" },
      { name: "Physics" },
      { name: "Computer Science" },
    ]);

    console.log("Subjects inserted.");

    // Insert Topics linked to Subjects
    const topics = await Topic.insertMany([
      { title: "Algebra", description: "Study of mathematical symbols", subject: subjects[0]._id },
      { title: "Calculus", description: "Study of change", subject: subjects[0]._id },
      { title: "Mechanics", description: "Study of forces and motion", subject: subjects[1]._id },
      { title: "Programming", description: "Study of algorithms and code", subject: subjects[2]._id },
    ]);

    console.log("Topics inserted.");

    // Insert Questions linked to Topics
    const questions = await Question.insertMany([
      {
        subject: subjects[0]._id,
        topic: topics[0]._id, // Algebra
        type: "mcq",
        text: "What is the value of x in the equation 2x + 3 = 7?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "2",
      },
      {
        subject: subjects[0]._id,
        topic: topics[1]._id, // Calculus
        type: "mcq",
        text: "What is the derivative of x^2?",
        options: ["x", "2x", "x^2", "2x^2"],
        correctAnswer: "2x",
      },
      {
        subject: subjects[0]._id,
        topic: topics[1]._id, // Calculus
        type: "mcq",
        text: "What is the derivative of x?",
        options: ["1", "2x", "x^2", "2x^2"],
        correctAnswer: "1",
      },
      {
        subject: subjects[1]._id,
        topic: topics[2]._id, // Mechanics
        type: "mcq",
        text: "Which law states that an object in motion stays in motion?",
        options: ["Newton's First Law", "Newton's Second Law", "Law of Gravity", "Kepler’s Law"],
        correctAnswer: "Newton's First Law",
      },
      {
        subject: subjects[2]._id,
        topic: topics[3]._id, // Programming
        type: "mcq",
        text: "Which programming language is known for its use in web development?",
        options: ["C", "Java", "Python", "JavaScript"],
        correctAnswer: "JavaScript",
      },
    ]);

    console.log("Questions inserted.");
    console.log("Database seeded successfully!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();
