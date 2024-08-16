import React, { useState } from "react";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-blue-800 dark:bg-gray-900 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-white">
              {/* Add your logo here */}
              MyBlog
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="/" className="text-white hover:text-gray-300">
              Home
            </a>
            <a href="/categories" className="text-white hover:text-gray-300">
              Categories
            </a>
            <a href="/tags" className="text-white hover:text-gray-300">
              Tags
            </a>
            <a href="/profile" className="text-white hover:text-gray-300">
              Profile
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
            />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
