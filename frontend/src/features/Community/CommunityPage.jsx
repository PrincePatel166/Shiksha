import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown, Lock } from "lucide-react"; // Import icons
import { useNavigate } from "react-router-dom";

const CommunityPage = ({ isAuthenticated }) => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState({ title: "", details: "", tags: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("https://shiksha-backend-vaw7.onrender.com/api/community/questions", {
        withCredentials: true,
      });
      setQuestions(res.data || []);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://shiksha-backend-vaw7.onrender.com/api/community/questions", newQuestion, {
        withCredentials: true, // Ensures authentication via cookies
      });
      fetchQuestions();
      setShowForm(false);
      setNewQuestion({ title: "", details: "", tags: "" });
    } catch (err) {
      console.error("Error submitting question:", err);
    }
  };

  const handleVote = async (id, type) => {
    try {
      const res = await axios.put(`https://shiksha-backend-vaw7.onrender.com/api/community/questions/${id}/vote`, { type }, {
        withCredentials: true,
      });

      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q._id === id ? { ...q, upvotes: res.data.upvotes, downvotes: res.data.downvotes } : q
        )
      );
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Community Section</h2>
        <p className="text-red-500 text-lg font-semibold">You must be logged in to access this section.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {/* <h1 className="text-4xl font-extrabold mb-8 text-center text-black-500">Community Support</h1> */}
      <h1 className="text-4xl font-extrabold mb-8 text-center text-black-700 drop-shadow-md">Community Support</h1>
      {isAuthenticated ? (
        <button
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mb-4 hover:bg-blue-700 transition"
          onClick={() => setShowForm(!showForm)}
        >
          Ask a Question
        </button>
      ) : (
        <p className="text-center text-gray-600">
          Please <Link to="/login" className="text-blue-600">log in</Link> to ask a question.
        </p>
      )}

      {showForm && isAuthenticated && (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-100 p-4 rounded-lg shadow">
          <input
            type="text"
            placeholder="Title"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Question Details"
            value={newQuestion.details}
            onChange={(e) => setNewQuestion({ ...newQuestion, details: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={newQuestion.tags}
            onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      )}

      <div className="mt-6 space-y-4">
        {questions.map((q) => (
          <div key={q._id} className="p-4 border border-gray-300 rounded-md shadow">
            <h3 className="text-xl font-semibold">{q.title}</h3>
            <p className="text-gray-600">{q.details ? q.details.slice(0, 100) : ""}...</p>
            <p className="text-sm text-gray-500">Tags: {q.tags?.join(", ")}</p>

            <div className="flex items-center space-x-4 mt-3">
              {isAuthenticated ? (
                <>
                  <button onClick={() => handleVote(q._id, "upvote")} className="flex items-center text-green-600 hover:text-green-700">
                    <ArrowUp size={20} className="mr-1" /> {q.upvotes.length}
                  </button>
                  <button onClick={() => handleVote(q._id, "downvote")} className="flex items-center text-red-600 hover:text-red-700">
                    <ArrowDown size={20} className="mr-1" /> {q.downvotes.length}
                  </button>
                </>
              ) : (
                <p className="text-gray-500">Login to vote</p>
              )}
            </div>

            <div className="mt-2 text-sm text-gray-500">
              <p><strong>Upvoted by:</strong> {q.upvotes.map(user => user.username).join(", ") || "No upvotes yet"}</p>
              <p><strong>Downvoted by:</strong> {q.downvotes.map(user => user.username).join(", ") || "No downvotes yet"}</p>
            </div>

            <Link
              to={`/question/${q._id}`}
              className="inline-block mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              View Details
            </Link>

            {q.locked && <Lock size={20} className="text-red-500 ml-2 inline-block" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
