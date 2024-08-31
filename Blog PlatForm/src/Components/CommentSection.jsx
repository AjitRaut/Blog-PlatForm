import React, { useState } from "react";
import CommentItem from "./CommentItem";
useState;

const CommentSection = ({
  comment,
  comments,
  setComment,
  handleAddComment,
}) => {
  const [showAllComments, setShowAllComments] = useState(false);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };

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
        className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white border-gray-300 dark:border-gray-600"
      />
      <button
        onClick={handleAddComment}
        className="mt-2 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800"
      >
        Add Comment
      </button>
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Comments
        </p>
        {comments.length > 0 ? (
          <>
            {comments
              .slice(0, showAllComments ? comments.length : 3)
              .map((c, index) => (
                <CommentItem key={index} comment={c} formatDate={formatDate} />
              ))}
            <button
              onClick={toggleComments}
              className="mt-2 text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-800"
            >
              {showAllComments ? "Show Less" : "Show More"}
            </button>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No comments yet</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
