import Topic from "../models/Topic.js";

export const getTopicNames = async (req, res) => {
  try {
    const topics = await Topic.find({}, "_id title"); // ✅ Fix: fetch "_id" and "title"
    res.status(200).json({ topicNames: topics });
  } catch (error) {
    console.error("Error fetching topic names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
