import axios from "axios";

const handleLogout = async (setUser) => {
  try {
    await axios.post("https://shiksha-backend-vaw7.onrender.com/api/users/logout", {}, { withCredentials: true });
    setUser(null);
  } catch (error) {
    console.error("Logout failed", error.response?.data?.message || error.message);
  }
};

export default handleLogout;
