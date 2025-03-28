import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Fetch questions
export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

// Add a new question
export const addQuestion = async (questionData) => {
  try {
    const response = await axios.post(`${BASE_URL}/questions`, questionData);
    return response.data;
  } catch (error) {
    console.error("Error adding question:", error);
    throw error;
  }
};

// Add an answer to a question
export const addAnswer = async (answerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/answers`, answerData);
    return response.data;
  } catch (error) {
    console.error("Error adding answer:", error);
    throw error;
  }
};

// Upvote or downvote an answer
export const voteAnswer = async (voteData) => {
  try {
    const response = await axios.post(`${BASE_URL}/vote`, voteData);
    return response.data;
  } catch (error) {
    console.error("Error voting on answer:", error);
    throw error;
  }
};
