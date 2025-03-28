import Topic from "../models/Topic.js";

export const getTopics = async (req, res) => {
  try {
    const topics = await Topic.find().populate("subject", "name");
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching topics" });
  }
};
