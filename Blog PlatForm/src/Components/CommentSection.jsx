import React from "react";

const CommentSection = ({ comments, handleCommentChange, handleAddComment, comment }) => {
  const formatDate = (date) => {
    if (date instanceof Date) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Intl.DateTimeFormat("en-GB", options).format(date);
    } else if (date?.seconds) {
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Intl.DateTimeFormat("en-GB", options).format(
        new Date(date.seconds * 1000)
      );
    } else {
      return "Date not available";
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={comment}
        onChange={handleCommentChange}
        placeholder="Add a comment..."
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={handleAddComment}
        className="mt-2 text-blue-500 dark:text-blue-400"
      >
        Add Comment
      </button>
      <div className="mt-4">
        <p className="text-lg font-semibold">Comments</p>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div key={index} className="border-t pt-2">
              <div className="flex items-start space-x-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">{c.author}</span>
                <span className="text-gray-600 dark:text-gray-400">{c.text}</span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {c.date ? formatDate(c.date) : "Date not available"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
