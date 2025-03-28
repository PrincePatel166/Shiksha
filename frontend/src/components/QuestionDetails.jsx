import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Lock } from "lucide-react"; // Lock icon from Lucide

const QuestionDetails = ({ isAuthenticated, user }) => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestionDetails();
  }, []);

  const fetchQuestionDetails = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/community/questions/${id}`, {
        withCredentials: true,
      });
      setQuestion(res.data);
      setAnswers(res.data.answers || []);
    } catch (err) {
      setError("Failed to load question details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) {
      alert("Answer cannot be empty!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/community/questions/${id}/answer`,
        { text: newAnswer },
        { withCredentials: true }
      );

      // Add the answer to the state manually with the logged-in user's name
      const newAnswerData = {
        _id: res.data._id, // Backend returns the new answer ID
        text: newAnswer,
        userId: { username: user?.username || "You" }, // Show current user's name immediately
      };

      setAnswers((prevAnswers) => [...prevAnswers, newAnswerData]); // Update without reload
      setNewAnswer("");
    } catch (err) {
      setError(err.response?.status === 401 ? "Unauthorized: Please log in to submit an answer." : "Failed to submit answer.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {loading ? (
        <p className="text-center text-gray-500">Loading question details...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : question ? (
        <>
          {/* Question Title */}
          <h2 className="text-2xl font-bold flex items-center">
            {question.title} {question.locked && <Lock size={20} className="text-red-500 ml-2" />}
          </h2>

          {/* Question Details */}
          <p className="text-gray-700 mt-2">{question.details}</p>
          <p className="text-sm text-gray-500 mt-2">
            <strong>Tags:</strong> {question.tags.join(", ")}
          </p>

          {/* Answers Section */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Answers</h3>
            {answers.length > 0 ? (
              answers.map((ans) => (
                <div key={ans._id} className="mt-3 p-3 bg-gray-100 rounded-md shadow-sm">
                  <p className="text-gray-800">
                    <strong className="text-blue-600">{ans.userId?.username || "Anonymous"}:</strong> {ans.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 mt-2">No answers yet. Be the first to answer!</p>
            )}
          </div>

          {/* Answer Submission Form */}
          {isAuthenticated ? (
            <form onSubmit={handleAnswerSubmit} className="mt-6 bg-gray-100 p-4 rounded-md shadow">
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Write your answer here..."
                required
                disabled={submitting}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={submitting}
                className="mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                {submitting ? "Submitting..." : "Submit Answer"}
              </button>
            </form>
          ) : (
            <p className="text-red-500 mt-4 text-center">You must be logged in to submit an answer.</p>
          )}
        </>
      ) : (
        <p className="text-center text-gray-500">Question not found.</p>
      )}
    </div>
  );
};

export default QuestionDetails;
