import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { FaHome, FaEnvelope, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login page
  };

  // Retrieve user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="flex items-center space-x-2">
            <FaUserCircle className="text-3xl" />
            <span>PhishNexus</span>
          </Link>
        </h1>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="flex items-center space-x-2 hover:text-gray-300">
              <FaHome />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/emailpage" className="flex items-center space-x-2 hover:text-gray-300">
              <FaEnvelope />
              <span>Emails</span>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <span className="font-semibold">{user.name}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  <FiLogOut />
                  <span>Logout</span>
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
              >
                <FaUserCircle />
                <span>Login</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
