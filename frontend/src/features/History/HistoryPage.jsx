import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const HistoryPage = ({ isAuthenticated }) => {
  const [examHistory, setExamHistory] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const [examsResponse, subjectsResponse, topicsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/exams", { withCredentials: true }),
          axios.get("http://localhost:5000/api/subjectname", { withCredentials: true }),
          axios.get("http://localhost:5000/api/topicname", { withCredentials: true }),
        ]);

        const exams = examsResponse.data.exams || [];
        const subjects = subjectsResponse.data.subjectNames || [];
        const topics = topicsResponse.data.topicNames || [];

        const subjectMap = subjects.reduce((acc, sub) => {
          acc[String(sub._id)] = sub.name;
          return acc;
        }, {});

        const topicMap = topics.reduce((acc, top) => {
          acc[String(top._id)] = top.title;
          return acc;
        }, {});

        const updatedExams = exams.map((exam) => ({
          ...exam,
          subjectName: subjectMap[String(exam.subject)] || "Unknown Subject",
          topicName: topicMap[String(exam.topic)] || "Unknown Topic",
        }));

        setExamHistory(updatedExams);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const handleExamClick = async (examId) => {
    try {
      const [examResponse, subjectsResponse, topicsResponse] = await Promise.all([
        axios.get(`http://localhost:5000/api/exams/${examId}`, { withCredentials: true }),
        axios.get("http://localhost:5000/api/subjectname", { withCredentials: true }),
        axios.get("http://localhost:5000/api/topicname", { withCredentials: true }),
      ]);

      const exam = examResponse.data;
      const subjects = subjectsResponse.data.subjectNames || [];
      const topics = topicsResponse.data.topicNames || [];

      const subjectMap = subjects.reduce((acc, sub) => {
        acc[String(sub._id)] = sub.name;
        return acc;
      }, {});

      const topicMap = topics.reduce((acc, top) => {
        acc[String(top._id)] = top.title;
        return acc;
      }, {});

      setSelectedExam({
        ...exam,
        subjectName: subjectMap[String(exam.subject)] || "Unknown Subject",
        topicName: topicMap[String(exam.topic)] || "Unknown Topic",
      });
    } catch (error) {
      console.error("Error fetching exam details:", error);
      alert("Failed to fetch exam details.");
    }
  };

  const handleDeleteExam = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/exams/${id}`, {
        withCredentials: true,
      });
      setExamHistory((prev) => prev.filter((exam) => exam._id !== id));
      setSelectedExam(null);
      alert("Exam deleted successfully.");
    } catch (error) {
      console.error("Error deleting exam:", error);
      alert("Failed to delete exam.");
    }
  };

  const getChartData = (exam) => {
    if (!exam || !exam.questionResults) return {};

    const attempted = exam.questionResults.length;
    const unattempted = exam.totalQuestions - attempted;
    const correct = exam.questionResults.filter((q) => q.isCorrect).length;
    const incorrect = attempted - correct;

    return {
      attemptedVsUnattempted: {
        labels: ["Attempted", "Unattempted"],
        datasets: [
          {
            data: [attempted, unattempted],
            backgroundColor: ["#4CAF50", "#FF9800"],
          },
        ],
      },
      correctVsIncorrect: {
        labels: ["Correct", "Incorrect"],
        datasets: [
          {
            data: [correct, incorrect],
            backgroundColor: ["#2196F3", "#F44336"],
          },
        ],
      },
    };
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">History Section</h2>
        <p className="text-red-500 text-lg font-semibold">
          You must be logged in to access this section.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* <h1 className="text-4xl font-extrabold mb-8 text-center text-black-500">Exam History</h1> */}
      <h1 className="text-4xl font-extrabold mb-8 text-center text-black-700 drop-shadow-md">Exam History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examHistory.map((exam) => (
          <div
            key={exam._id}
            className="border p-5 rounded-lg shadow-md bg-white hover:shadow-xl transition cursor-pointer"
            onClick={() => handleExamClick(exam._id)}
          >
            <h2 className="text-lg font-semibold text-gray-900">{exam.subjectName}</h2>
            <p className="text-gray-600">Topic: {exam.topicName}</p>
            <p className="text-gray-600">Date: {new Date(exam.createdAt).toLocaleDateString()}</p>
            <p className="text-gray-700 font-medium">
              Score: {exam.score ? `${(exam.score / exam.totalQuestions) * 100}%` : "0%"}
            </p>
          </div>
        ))}
      </div>

      {selectedExam && (
        <div className="mt-8 border p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{selectedExam.subjectName} - Performance Report</h2>
          <p className="text-gray-600">Topic: {selectedExam.topicName}</p>
          <p className="text-gray-600">Date: {new Date(selectedExam.createdAt).toLocaleDateString()}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="p-4 border rounded-lg shadow bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-2">Attempted vs. Unattempted</h3>
              <Pie data={getChartData(selectedExam).attemptedVsUnattempted} />
            </div>

            <div className="p-4 border rounded-lg shadow bg-gray-50">
              <h3 className="font-semibold text-gray-800 mb-2">Correct vs. Incorrect</h3>
              <Pie data={getChartData(selectedExam).correctVsIncorrect} />
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition shadow-mdg" 
            onClick={() => setSelectedExam(null)}>
              Back
            </button>
            <button className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
              onClick={() => handleDeleteExam(selectedExam._id)}>
              Delete Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
