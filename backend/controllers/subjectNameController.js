import Subject from "../models/Subject.js";

export const getSubjectNames = async (req, res) => {
  try {
    const subjects = await Subject.find({}, "_id name");
    res.status(200).json({ subjectNames: subjects });
  } catch (error) {
    console.error("Error fetching subject names:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
