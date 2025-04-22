import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const LoginPage = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ emailOrUsername: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData,
        { withCredentials: true }
      );

      console.log(res.data);
      setIsAuthenticated(true); // ✅ Update the global state
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="emailOrUsername" placeholder="Email or Username" value={formData.emailOrUsername} onChange={handleChange} className="w-full p-2 border rounded mb-3"/>
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded mb-3"/>
          <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-2 text-sm">Don't have an account? <Link to="/signup" className="text-red-500">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
