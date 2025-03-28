import axios from "axios";

const handleLogout = async (setUser) => {
  try {
    await axios.post("http://localhost:5000/api/users/logout", {}, { withCredentials: true });
    setUser(null);
  } catch (error) {
    console.error("Logout failed", error.response?.data?.message || error.message);
  }
};

export default handleLogout;
