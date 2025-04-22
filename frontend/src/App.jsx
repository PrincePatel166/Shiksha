import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/MainLayout";
import HeroSection from "./components/HeroSection";
import Home from "./features/Home/HomePage";
import Learning from "./features/Learning/LearningPage";
import Exam from "./features/Exam/ExamPage";
import History from "./features/History/HistoryPage";
import Community from "./features/Community/CommunityPage";
import Feedback from "./features/Feedback/FeedbackPage";
import QuestionDetails from "./components/QuestionDetails";
import Login from "./features/Auth/LoginPage";
import Signup from "./features/Auth/SignupPage";
import GetProfile from "./features/Auth/GetProfilePage";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // Prevents flickering

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}>
          <Route index element={<HeroSection />} />
          <Route path="/home" element={<Home />} />
          <Route path="learning" element={<Learning isAuthenticated={isAuthenticated}  />} />
          <Route path="exam" element={<Exam isAuthenticated={isAuthenticated}/>} />
          <Route path="history" element={<History isAuthenticated={isAuthenticated}/>} />
          <Route path="community" element={<Community isAuthenticated={isAuthenticated}/>} />
          <Route path="feedback" element={<Feedback isAuthenticated={isAuthenticated} />} />
          <Route path="/question/:id" element={<QuestionDetails isAuthenticated={isAuthenticated}/>} />
        </Route>

        {/* Login & Signup routes */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated} />} />

        {/* Profile route - Redirect if not authenticated */}
        <Route
          path="/profile"
          element={isAuthenticated ? <GetProfile /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
