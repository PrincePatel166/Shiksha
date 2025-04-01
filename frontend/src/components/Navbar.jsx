import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
      
      // Ensure session is cleared
      setIsAuthenticated(false);
      
      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-2xl font-bold text-gray-800 tracking-wide">Shiksha</h1>
      </div>
  
      <div className="hidden md:flex space-x-8 text-lg">
        <Link to="/home" className="text-gray-600 hover:text-red-500 transition duration-300">Home</Link>
        <Link to="/learning" className="text-gray-600 hover:text-red-500 transition duration-300">Learning</Link>
        <Link to="/exam" className="text-gray-600 hover:text-red-500 transition duration-300">Exam</Link>
        <Link to="/history" className="text-gray-600 hover:text-red-500 transition duration-300">History</Link>
        <Link to="/community" className="text-gray-600 hover:text-red-500 transition duration-300">Community</Link>
        <Link to="/feedback" className="text-gray-600 hover:text-red-500 transition duration-300">Feedback</Link>
      </div>
  
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="border border-blue-500 text-gray-800 px-5 py-2 rounded-full font-medium hover:bg-blue-100 transition duration-300">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-full font-medium hover:bg-red-600 transition duration-300 shadow-lg"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="border border-red-500 text-gray-800 px-5 py-2 rounded-full font-medium hover:bg-red-100 transition duration-300">
              Sign In
            </Link>
            <Link to="/signup" className="bg-red-500 text-white px-5 py-2 rounded-full font-medium hover:bg-red-600 transition duration-300 shadow-lg">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );  
};

export default Navbar;
