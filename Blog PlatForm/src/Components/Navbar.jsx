import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase"; // Import auth from firebase.js
import { signOut, onAuthStateChanged } from "firebase/auth";
import HeroSection from "./HeroSection";

function Navbar() {
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (event.target.closest(".profile-dropdown") === null) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

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
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/categories" className="text-white hover:text-gray-300">
              Categories
            </Link>
            <Link to="/tags" className="text-white hover:text-gray-300">
              Tags
            </Link>
            {user ? (
              <div className="relative profile-dropdown">
                <button
                  className="text-white hover:text-gray-300 focus:outline-none"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  Profile
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Settings
                    </Link>
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
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
                <Link to="/signup" className="text-white hover:text-gray-300">
                  Sign Up
                </Link>
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
            <Link
              to="/home"
              className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
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
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
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
                <Link
                  to="/login"
                  className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-white hover:bg-gray-700 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );


}

export default Navbar;
