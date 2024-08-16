import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase"; // Import auth from firebase.js
import { signOut } from "firebase/auth";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const user = auth.currentUser; // Check if the user is authenticated

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  return (
    <nav className="bg-blue-800 dark:bg-gray-900 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              MyBlog
            </Link>
          </div>
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className="text-white hover:text-gray-300">
              Home
            </NavLink>
            <NavLink to="/categories" className="text-white hover:text-gray-300">
              Categories
            </NavLink>
            <NavLink to="/tags" className="text-white hover:text-gray-300">
              Tags
            </NavLink>
            {user ? (
              <div className="relative">
                <button
                  className="text-white hover:text-gray-300 focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  Profile
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg">
                    <NavLink to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      My Profile
                    </NavLink>
                    <NavLink to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Settings
                    </NavLink>
                    <button
                      onClick={handleSignOut}
                      className="block px-4 py-2 text-left w-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink to="/login" className="text-white hover:text-gray-300">
                  Login
                </NavLink>
                <NavLink to="/signup" className="text-white hover:text-gray-300">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none hidden md:block"
            />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <NavLink
              to="/"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/categories"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </NavLink>
            <NavLink
              to="/tags"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Tags
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/profile"
                  className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </NavLink>
                <NavLink
                  to="/settings"
                  className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </NavLink>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block px-3 py-2 text-left text-white hover:bg-gray-700 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
