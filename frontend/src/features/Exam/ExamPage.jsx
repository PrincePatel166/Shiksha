import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Exam = ({ isAuthenticated }) => {
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState({});
  const [lockedAnswers, setLockedAnswers] = useState({});
  const [examResult, setExamResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
   const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubjects();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (examStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      submitExam(); // Auto-submit when time runs out
    }
  }, [examStarted, timeLeft]);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/exams/subjects", { withCredentials: true });
      setSubjects(response.data.subjects);
    } catch (err) {
      setError("Failed to load subjects");
    }
  };

  const fetchTopics = async (subjectId) => {
    if (!subjectId) return;
    try {
      const response = await axios.get(`http://localhost:5000/api/exams/topics/${subjectId}`, { withCredentials: true });
      setTopics(response.data.topics);
    } catch (err) {
      setError("Failed to load topics");
    }
  };

  const fetchQuestions = async () => {
    if (!selectedSubject || !selectedTopic) {
      setError("Please select both a subject and topic.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/exams/questions",
        { subject: selectedSubject, topic: selectedTopic },
        { withCredentials: true }
      );

      setQuestions(response.data.questions);
      setAnswers({});
      setMarkedForReview({});
      setLockedAnswers({});
      setCurrentQuestionIndex(0);
      setExamStarted(true);
      setTimeLeft(30 * 60); // Reset Timer
    } catch (err) {
      setError("Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    if (!lockedAnswers[questionId]) {
      setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    }
  };

  const markForReview = () => {
    const questionId = questions[currentQuestionIndex]._id;
  
    setMarkedForReview((prev) => {
      const updated = { ...prev };
  
      if (updated[questionId]) {
        delete updated[questionId]; // Unmark if already marked
      } else {
        updated[questionId] = true; // Mark if not already marked
      }
      let nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    }
      
      return updated;
      
    });
  };
  
  const nextQuestion = () => {
    const questionId = questions[currentQuestionIndex]._id;
  
    // Check if the current question is answered
    if (!answers[questionId]) {
      alert("Please select an answer before moving to the next question.");
      return; // Stop execution if no answer is selected
    }
  
    // Lock the answer for the current question
    setLockedAnswers((prev) => ({
      ...prev,
      [questionId]: true
    }));
  
    // Move to the next question
    let nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    }
  };
  
  const submitExam = async () => {
    const confirmSubmit = window.confirm("Are you sure you want to submit this exam?");
    if (!confirmSubmit) return;
    if (questions.length === 0) {
      setError("No questions available to submit.");
      return;
    }
  
    // Check if all questions have an answer
    const unansweredQuestions = questions.filter(q => !answers[q._id]);
    if (unansweredQuestions.length > 0) {
      alert("Please answer all questions before submitting because there is no negative marking .");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      // Fetch user profile to get userId
      const profileRes = await axios.get("http://localhost:5000/api/users/profile", {
        withCredentials: true,
      });
  
      const userId = profileRes.data?._id; // Extract userId
  
      if (!userId) {
        setError("User authentication failed.");
        setLoading(false);
        return;
      }
  
      const finalAnswers = questions.reduce((acc, question) => {
        acc[question._id] = answers[question._id]; // Store selected answers
        return acc;
      }, {});
  
      // Submit exam with userId
      const response = await axios.post(
        "http://localhost:5000/api/exams/submit",
        { answers: finalAnswers, subject: selectedSubject, topic: selectedTopic, userId },
        { withCredentials: true }
      );
  
      alert(response.data.message);
      navigate("/home");
      
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit exam.");
    } finally {
      setLoading(false);
    }
  };  
  if (!isAuthenticated) {
    return (
      <div className="p-6 max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Exam Section</h2>
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for Navigation */}
      {questions.length > 0 && (
        <div className="w-1/4 p-5 border-r bg-white shadow-md">
          <h2 className="text-lg font-bold mb-4 text-gray-700">Question Navigation</h2>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, index) => (
              <button
                key={q._id}
                className={`p-3 border rounded-full text-sm font-semibold transition ${
                  lockedAnswers[q._id]
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : markedForReview[q._id]
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => !lockedAnswers[q._id] && setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
  
      {/* Main Exam Section */}
      <div className="w-3/4 p-10">
      {/* <h1 className="text-4xl font-extrabold mb-8 text-center text-black-500">Online Exam</h1> */}
      <h1 className="text-4xl font-extrabold mb-8 text-center text-black-700 drop-shadow-md">Online Exam</h1>
  
        {!isAuthenticated ? (
          <div className="text-center">
            <p className="text-red-500 text-lg font-semibold">You must be logged in to take the exam.</p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Go to Login
            </button>
          </div>
        ) : (
          <>
            {!examStarted && (
              <div className="bg-white shadow-md p-6 rounded-lg">
                <div className="mb-4">
                  <label className="block font-semibold mb-1">Select Subject:</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => {
                      setSelectedSubject(e.target.value);
                      fetchTopics(e.target.value);
                      setSelectedTopic("");
                    }}
                    className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">-- Choose Subject --</option>
                    {subjects.map((subj) => (
                      <option key={subj._id} value={subj._id}>
                        {subj.name}
                      </option>
                    ))}
                  </select>
                </div>
  
                {selectedSubject && (
                  <div className="mb-4">
                    <label className="block font-semibold mb-1">Select Topic:</label>
                    <select
                      value={selectedTopic}
                      onChange={(e) => setSelectedTopic(e.target.value)}
                      className="w-full p-3 border rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">-- Choose Topic --</option>
                      {topics.map((top) => (
                        <option key={top._id} value={top._id}>
                          {top.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
  
                <button
                  onClick={fetchQuestions}
                  className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Start Exam"}
                </button>
              </div>
            )}
  
            {examStarted && (
              <div className="text-lg font-bold text-red-600 text-center mb-4 bg-gray-200 p-3 rounded-lg">
                Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </div>
            )}
  
            {examStarted && questions.length > 0 && (
              <div className="mt-6 bg-white shadow-md p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">{questions[currentQuestionIndex]?.text}</h3>
                <div className="mt-4">
                  {questions[currentQuestionIndex]?.options.map((option) => (
                    <div key={option} className="flex items-center space-x-3 mb-2">
                      <input
                        type="radio"
                        name={`answer_${questions[currentQuestionIndex]._id}`} 
                        checked={answers[questions[currentQuestionIndex]._id] === option}
                        onChange={() => handleAnswerChange(questions[currentQuestionIndex]._id, option)}
                        disabled={lockedAnswers[questions[currentQuestionIndex]._id]}
                        className="w-4 h-4 text-blue-500"
                      />
                      <label className="text-gray-700">{option}</label>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={markForReview}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
                  >
                    Mark for Review
                  </button>
                  <button
                    onClick={nextQuestion}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    Next
                  </button>
                  <button
                    onClick={submitExam}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Submit Exam
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
  
};
export default Exam;
