import React from "react";

const Shimmer = () => {
  return (
    <div className="animate-pulse">
      {/* Title shimmer */}
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      
      {/* Image shimmer */}
      <div className="w-full h-80 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
      
      {/* Content shimmer (lines of text) */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      
      {/* Author and date shimmer */}
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
    </div>
  );
};

export default Shimmer;
