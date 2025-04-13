import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeedbackPage = ({ isAuthenticated }) => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    feedback: "",
    category: "General Query",
    isAnonymous: false,
  });
  const [filterCategory, setFilterCategory] = useState("All");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("https://shiksha-backend-vaw7.onrender.com/api/feedback", { withCredentials: true })
        .then((response) => setFeedbackList(response.data.feedbacks))
        .catch((error) => console.error("Error fetching feedback:", error));
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!isAuthenticated) {
      setError("You must be logged in to submit feedback.");
      return;
    }

    const feedbackData = {
      username: formData.isAnonymous ? "Anonymous" : formData.username.trim(),
      message: formData.feedback.trim(),
      category: formData.category,
      isAnonymous: formData.isAnonymous,
    };

    if (!feedbackData.message || !feedbackData.category || (!formData.isAnonymous && !formData.username.trim())) {
      setError("All fields are required unless submitting anonymously.");
      return;
    }

    try {
      const response = await axios.post(
        "https://shiksha-backend-vaw7.onrender.com/api/feedback",
        feedbackData,
        { withCredentials: true }
      );

      setFeedbackList((prev) => [...prev, response.data.feedback]);
      setFormData({
        username: "",
        feedback: "",
        category: "General Query",
        isAnonymous: false,
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError("Failed to submit feedback. Please try again.");
    }
  };

  const filteredFeedback =
    filterCategory === "All"
      ? feedbackList
      : feedbackList.filter((item) => item.category === filterCategory);
  
      if (!isAuthenticated) {
        return (
          <div className="p-6 max-w-screen-lg mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Feedback Section</h2>
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
    <div className="max-w-4xl mx-auto p-6">
      {/* <h1 className="text-4xl font-extrabold mb-8 text-center text-black-500">Feedback</h1> */}
      <h1 className="text-4xl font-extrabold mb-8 text-center text-black-700 drop-shadow-md">Feedback</h1>
      {isAuthenticated ? (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Submit Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!formData.isAnonymous && (
              <div>
                <label className="block text-gray-600 font-medium mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}
            <div>
              <label className="block text-gray-600 font-medium mb-1">Feedback</label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Write your feedback here..."
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-600 font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="General Query">General Query</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-gray-600">Submit as Anonymous</label>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      ) : (
        <p className="text-red-500 text-center">You must be logged in to submit feedback.</p>
      )}

      {/* Filter Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Feedback List</h2>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="General Query">General Query</option>
          <option value="Bug Report">Bug Report</option>
          <option value="Feature Request">Feature Request</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {Array.isArray(filteredFeedback) && filteredFeedback.length > 0 ? (
          filteredFeedback.map((item) => (
            <div key={item._id} className="bg-white shadow rounded-lg p-4 hover:shadow-lg transition">
              <p className="text-lg font-semibold text-gray-800">
                {item.isAnonymous ? "Anonymous" : item.username}
              </p>
              <p className="text-gray-600">{item.message}</p>
              <p className="text-sm text-gray-500 italic">{item.category}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
