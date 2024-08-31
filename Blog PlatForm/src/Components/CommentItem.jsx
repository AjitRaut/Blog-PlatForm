import React from "react";

const CommentItem = ({ comment, formatDate }) => {
  return (
    <div className="border-t pt-2">
      <div className="flex items-start space-x-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {comment.author}
        </span>
        <span className="text-gray-600 dark:text-gray-400">{comment.text}</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm">
        {comment.date ? formatDate(comment.date) : "Date not available"}
      </p>
    </div>
  );
};

export default CommentItem;
