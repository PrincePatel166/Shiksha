import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Learning = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return; // Prevent fetching if user is not authenticated

    async function fetchData() {
      try {
        const subjectResponse = await axios.get("/api/subjects", { withCredentials: true });
        const topicResponse = await axios.get("/api/topics", { withCredentials: true });

        const fetchedSubjects = Array.isArray(subjectResponse.data) ? subjectResponse.data : [];
        const fetchedTopics = Array.isArray(topicResponse.data) ? topicResponse.data : [];

        setSubjects(fetchedSubjects);
        setTopics(fetchedTopics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    
    fetchData();
  }, [isAuthenticated]);

  useEffect(() => {
    let filtered = topics;

    if (selectedSubject) {
      filtered = filtered.filter((topic) => {
        if (typeof topic.subject === "string") {
          return topic.subject.trim().toLowerCase() === selectedSubject.trim().toLowerCase();
        } else if (typeof topic.subject === "object" && topic.subject?.name) {
          return topic.subject.name.trim().toLowerCase() === selectedSubject.trim().toLowerCase();
        }
        return false;
      });
    }

    if (searchQuery) {
      filtered = filtered.filter((topic) =>
        topic.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    console.log("Filtered Topics:", filtered); // Debugging
    setFilteredTopics(filtered);
    setSelectedTopic(null);
  }, [selectedSubject, searchQuery, topics]);

  if (!isAuthenticated) {
    return (
      <div className="p-6 max-w-screen-lg mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Learning Section</h1>
        <p className="text-lg text-red-500 font-semibold">
          You must be logged in to access this section.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-screen-lg mx-auto bg-gray-100 min-h-screen">
      {/* <h1 className="text-4xl font-extrabold mb-8 text-center text-black-500">Learning Section</h1> */}
      <h1 className="text-4xl font-extrabold mb-8 text-center text-black-700 drop-shadow-md">Learning Section</h1>
  
      {/* Subject Dropdown */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2 text-gray-800">Select a Subject</label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white shadow-md"
        >
          <option value="">All Subjects</option>
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <option key={subject._id} value={subject.name}>
                {subject.name}
              </option>
            ))
          ) : (
            <option disabled>No subjects available</option>
          )}
        </select>
      </div>
  
      {/* Topic Dropdown */}
      {selectedSubject && (
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-gray-800">Select a Topic</label>
          <select
            value={selectedTopic?._id || ""}
            onChange={(e) => {
              const topic = filteredTopics.find((topic) => topic._id.toString() === e.target.value);
              setSelectedTopic(topic);
            }}
            className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 bg-white shadow-md"
          >
            <option value="">Select a Topic</option>
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => (
                <option key={topic._id} value={topic._id}>
                  {topic.title}
                </option>
              ))
            ) : (
              <option disabled>No topics available</option>
            )}
          </select>
        </div>
      )}
  
      {/* Topic Details */}
      {selectedTopic && (
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">{selectedTopic.title}</h2>
          <p className="text-gray-700 leading-relaxed">{selectedTopic.description}</p>
        </div>
      )}
  
      {/* No Topics Message */}
      {selectedSubject && filteredTopics.length === 0 && (
        <p className="text-gray-600 text-center italic mt-4">No topics available for this subject.</p>
      )}
    </div>
  );  
};

export default Learning;
