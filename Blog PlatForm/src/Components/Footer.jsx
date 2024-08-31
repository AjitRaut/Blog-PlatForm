import React from "react";
import { Link } from "react-router-dom"; // or use your routing library
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 dark:bg-gray-800 dark:text-gray-200 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src="/path-to-your-logo.png" // Update with your logo path
            alt="Blog Logo"
            className="h-10"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row mb-4 md:mb-0">
          <Link to="/about" className="mx-2 hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="mx-2 hover:underline">
            Contact
          </Link>
          <Link to="/privacy-policy" className="mx-2 hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="mx-2 hover:underline">
            Terms of Service
          </Link>
        </nav>

        <div className="flex space-x-4 mb-4 md:mb-0">
          <a
            href="https://github.com/AjitRaut"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/ajit-raut-b1254222a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://leetcode.com/u/ajit_raut_17/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 4v12h1V4H5zm2.5 0v12h1V4h-1zm2.5 0v12h1V4h-1zm2.5 0v12h1V4h-1zm2.5 0v12h1V4h-1z" />
            </svg>
          </a>
        </div>

        <div className="text-sm">
          <p>
            &copy; {new Date().getFullYear()} Your Blog Name. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
