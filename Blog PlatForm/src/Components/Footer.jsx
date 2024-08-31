import React from 'react';
import { Link } from 'react-router-dom'; // or use your routing library

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
          <Link to="/" className="mx-2 hover:underline">About Us</Link>
          <Link to="/" className="mx-2 hover:underline">Contact</Link>
          <Link to="/" className="mx-2 hover:underline">Privacy Policy</Link>
          <Link to="/" className="mx-2 hover:underline">Terms of Service</Link>
        </nav>
        
        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12.09c0-5.52-4.48-10-10-10S2 6.57 2 12.09c0 4.98 3.65 9.13 8.44 9.84v-6.95H7.89v-2.75h2.55v-2.04c0-2.5 1.52-3.86 3.75-3.86 1.07 0 2.22.2 2.22.2v2.43h-1.25c-1.24 0-1.63.77-1.63 1.57v1.86h2.77l-.44 2.75h-2.33v6.95C18.35 21.22 22 17.07 22 12.09z"/></svg>
          </a>
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.635 8.53c.014.194.014.388.014.582 0 5.933-4.51 12.769-12.769 12.769-2.538 0-4.891-.743-6.887-2.013.354.042.714.062 1.073.062 2.084 0 4-1.789 4-4v-.05c-.739.407-1.563.677-2.434.797-1.343-1.43-3.553-1.77-5.464-1.093-.336.572-.529 1.233-.529 1.945 0 1.341.68 2.529 1.712 3.22-.632-.02-1.225-.194-1.743-.485v.05c0 1.874 1.332 3.438 3.096 3.8-.322.088-.661.136-1.008.136-.247 0-.489-.024-.727-.069.488 1.53 1.904 2.647 3.579 2.677-1.311 1.03-2.969 1.644-4.765 1.644-.31 0-.616-.018-.918-.053 1.708 1.094 3.735 1.734 5.933 1.734 7.119 0 11.074-5.892 11.074-10.986 0-.168-.004-.336-.012-.504.761-.549 1.418-1.24 1.94-2.027z"/></svg>
          </a>
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.213 0 3.586.012 4.86.071 1.069.059 1.856.237 2.484.497.637.263 1.174.607 1.7 1.134.525.525.87 1.063 1.134 1.7.26.628.438 1.415.497 2.484.059 1.274.071 1.647.071 4.86s-.012 3.586-.071 4.86c-.059 1.069-.237 1.856-.497 2.484-.263.637-.607 1.174-1.134 1.7-.525.525-1.063.87-1.7 1.134-.628.26-1.415.438-2.484.497-1.274.059-1.647.071-4.86.071s-3.586-.012-4.86-.071c-1.069-.059-1.856-.237-2.484-.497-.637-.263-1.174-.607-1.7-1.134-.525-.525-.87-1.063-1.134-1.7-.26-.628-.438-1.415-.497-2.484-.059-1.274-.071-1.647-.071-4.86s.012-3.586.071-4.86c.059-1.069.237-1.856.497-2.484.263-.637.607-1.174 1.134-1.7.525-.525 1.063-.87 1.7-1.134.628-.26 1.415-.438 2.484-.497 1.274-.059 1.647-.071 4.86-.071zm0-2.163c-3.263 0-3.667.014-4.946.072-1.252.061-2.366.263-3.291.577-1.059.333-1.991.807-2.743 1.564-1.378 1.379-2.406 3.199-2.406 5.486 0 2.298 1.047 4.11 2.406 5.486.751.756 1.683 1.23 2.743 1.564.925.313 2.039.515 3.291.577 1.279.058 1.683.072 4.946.072 3.263 0 3.667-.014 4.946-.072 1.252-.061 2.366-.263 3.291-.577 1.059-.333 1.991-.807 2.743-1.564 1.378-1.379 2.406-3.199 2.406-5.486 0-2.298-1.047-4.11-2.406-5.486-.751-.756-1.683-1.23-2.743-1.564-1.279-.313-2.039-.515-3.291-.577-1.279-.058-1.683-.072-4.946-.072zm0 6.317c-2.984 0-5.408 2.42-5.408 5.406s2.424 5.408 5.408 5.408 5.408-2.42 5.408-5.408-2.424-5.406-5.408-5.406zm0 8.892c-1.922 0-3.486-1.558-3.486-3.486 0-1.929 1.564-3.486 3.486-3.486 1.928 0 3.486 1.557 3.486 3.486 0 1.928-1.558 3.486-3.486 3.486zm4.095-9.978c-.83 0-1.527-.676-1.527-1.506s.697-1.506 1.527-1.506c.83 0 1.527.676 1.527 1.506s-.697 1.506-1.527 1.506z"/></svg>
          </a>
        </div>
        
        {/* Copyright Notice */}
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} MyBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
