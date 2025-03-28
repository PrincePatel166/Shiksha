import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-8 bg-gray-50">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-6 text-black-700 drop-shadow-lg">
          🔎 Explore Our Powerful Features
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Unlock the full potential of <b>Shiksha</b> with interactive learning, mock tests, and a thriving community.
        </p>
      </div>

      {/* Feature Cards Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1: Learning */}
        <div className="bg-white rounded-xl shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img src="/src/assets/learning.svg" alt="Learning" className="w-16 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">📚 Interactive Learning</h3>
          <p className="text-gray-600 mt-2">
            Dive into high-quality <b>learning materials</b> with interactive lessons and quizzes.
          </p>
          <button
            className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform"
            onClick={() => navigate("/learning")}
          >
            Start Learning →
          </button>
        </div>

        {/* Feature 2: Exam */}
        <div className="bg-white rounded-xl shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img src="/src/assets/exam.svg" alt="Exam" className="w-16 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">📝 Mock Exams & Tests</h3>
          <p className="text-gray-600 mt-2">
            Prepare for real-world exams with <b>mock tests</b> and <b>practice questions</b>.
          </p>
          <button
            className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform"
            onClick={() => navigate("/exam")}
          >
            Take a Test →
          </button>
        </div>

        {/* Feature 3: Community */}
        <div className="bg-white rounded-xl shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img src="/src/assets/community.svg" alt="Community" className="w-16 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">🤝 Join the Community</h3>
          <p className="text-gray-600 mt-2">
            Engage with a <b>community of learners!</b> Discuss doubts, share thoughts, and connect with peers.
          </p>
          <button
            className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform"
            onClick={() => navigate("/community")}
          >
            Join Now →
          </button>
        </div>

        {/* Feature 4: History */}
        <div className="bg-white rounded-xl shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img src="/src/assets/history.svg" alt="History" className="w-16 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">📊 Track Your Progress</h3>
          <p className="text-gray-600 mt-2">
            View your past exams, score, and <b>exam history</b> with detailed reports and graphs.
          </p>
          <button
            className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform"
            onClick={() => navigate("/history")}
          >
            View History →
          </button>
        </div>

        {/* Feature 5: Feedback */}
        <div className="bg-white rounded-xl shadow-xl p-6 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <img src="/src/assets/feedback.svg" alt="Feedback" className="w-16 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800">💬 Share Your Feedback</h3>
          <p className="text-gray-600 mt-2">
            Help us improve <b>Shiksha</b> by sharing your valuable feedback.
          </p>
          <button
            className="mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full hover:scale-105 transition-transform"
            onClick={() => navigate("/feedback")}
          >
            Submit Feedback →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
