import React from "react";

const PostContent = ({ post, showFullContent, toggleContent }) => {
  return (
    <div>
      <p className="text-gray-700 dark:text-gray-300">
        {showFullContent
          ? post.content
          : `${post.content.substring(0, 100)}...`}
      </p>
      <button
        onClick={toggleContent}
        className="mt-2 text-blue-500 dark:text-blue-400"
      >
        {showFullContent ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default PostContent;
