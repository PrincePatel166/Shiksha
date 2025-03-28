import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GetProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        withCredentials: true,
      });
      console.log("Fetched User:", res.data);
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex items-center justify-center relative">
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-6 left-6 bg-white text-blue-600 font-semibold px-4 py-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition duration-300"
      >
        ← Home
      </button>
  
      <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-200">
        {/* <h1 className="text-3xl font-bold text-center text-gray-800 drop-shadow-md">User Profile</h1> */}
        <h1 className="text-4xl font-extrabold mb-8 text-center text-black-700 drop-shadow-md">User Profile</h1>
  
        {user ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
              <span className="text-blue-500 text-xl">🆔</span>
              <p className="text-gray-700 font-medium"><strong className="text-gray-900">ID:</strong> {user._id}</p>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
              <span className="text-green-500 text-xl">👤</span>
              <p className="text-gray-700 font-medium"><strong className="text-gray-900">Full Name:</strong> {user.fullName}</p>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
              <span className="text-red-500 text-xl">📧</span>
              <p className="text-gray-700 font-medium"><strong className="text-gray-900">Email:</strong> {user.email}</p>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
              <span className="text-purple-500 text-xl">🔑</span>
              <p className="text-gray-700 font-medium"><strong className="text-gray-900">Username:</strong> {user.username}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        )}
      </div>
    </div>
  );  
};

export default GetProfilePage;
