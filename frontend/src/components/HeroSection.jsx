import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const handleExploreMore = () => {
    setShowMore(true);
    setTimeout(() => {
      document.getElementById("info-section").scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-50 py-20 px-8 flex flex-col md:flex-row items-center">
        {/* Left Section - Text */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Learn, Practice, <br />
            <span className="text-red-500">Excel with Shiksha</span>
          </h1>
          <p className="text-gray-700 text-lg max-w-lg mx-auto md:mx-0">
            Join a community of learners, take exams, analyze your progress, and contribute to a growing knowledge base.
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
            <button
              className="bg-red-500 text-white px-6 py-3 rounded-full shadow-xl hover:bg-red-600 hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/home")}
            >
              Get Started
            </button>
            <button
              className="border border-gray-500 text-gray-800 px-6 py-3 rounded-full shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300"
              onClick={handleExploreMore}
            >
              Explore More
            </button>
          </div>
        </div>
  
        {/* Right Section - Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="/src/assets/hero-image.jpg"
            alt="Learning"
            className="w-3/4 md:w-full object-cover rounded-xl shadow-2xl hover:scale-105 transition-all duration-300"
          />
        </div>
      </section>
  
      {/* Explore More Section */}
      {showMore && (
        <motion.section
          id="info-section"
          className="py-20 px-8 bg-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How Shiksha Helps You Succeed
          </h2>
  
          {/* Feature 1: Engaging Learning Experience */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <img
                src="/src/assets/study-group.jpg"
                alt="Students studying"
                className="w-3/4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">Engaging Learning Experience</h3>
              <p className="text-gray-600 text-lg">
                Shiksha provides interactive lessons, quizzes, and study resources that make learning fun and effective.
              </p>
            </div>
          </div>
  
          {/* Feature 2: Track Your Progress */}
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">Track Your Progress</h3>
              <p className="text-gray-600 text-lg">
                Our smart analytics help you monitor your strengths and areas for improvement, ensuring continuous learning.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/src/assets/progress-tracking.jpg"
                alt="Progress tracking"
                className="w-3/4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
  
          {/* Feature 3: Exam Preparation */}
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <div className="flex justify-center">
              <img
                src="/src/assets/exam-prep.jpg"
                alt="Exam preparation"
                className="w-3/4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">Exam Preparation Made Easy</h3>
              <p className="text-gray-600 text-lg">
                Take mock exams, get instant feedback, and be well-prepared for your assessments with Shiksha.
              </p>
            </div>
          </div>

          {/* New Feature 4 */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">Interactive Community</h3>
            <p className="text-gray-600 text-lg">
              Connect with peers and educators, ask questions, and engage in meaningful discussions on our platform.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="/src/assets/community.jpg"
              alt="Community discussions"
              className="w-3/4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

          {/* Feature 5: Feedback */}
          <div className="grid md:grid-cols-2 gap-12 items-center mt-16">
            <div className="flex justify-center">
              <img
                src="/src/assets/feedback.jpg"
                alt="User feedback"
                className="w-3/4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800">Help Improve Shiksha</h3>
              <p className="text-gray-600 text-lg">
                Your feedback helps us enhance Shiksha. Share your suggestions, report issues, and help us build a better learning experience.
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </>
  );  
};

export default HeroSection;
