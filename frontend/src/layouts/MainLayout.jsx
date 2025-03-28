import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ isAuthenticated, setIsAuthenticated }) => {
  return (
    <div className="flex flex-col h-screen overflow-auto w-screen">
      {/* Header Section */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      </header>

      {/* Dynamic Content Section */}
      <main className="flex-grow bg-gray-50 p-4">
        <Outlet />
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-4">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
