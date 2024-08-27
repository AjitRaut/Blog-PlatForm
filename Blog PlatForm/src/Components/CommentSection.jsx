import React, { useState } from "react";
import CommentItem from "./CommentItem";

const CommentSection = ({
  comment,
  comments,
  setComment,
  handleAddComment,
  showAllComments,
  toggleComments,
  formatDate,
}) => {
  const handleCommentChange = (e) => {
    setComment(e.target.value);
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
          <>
            {comments.slice(0, showAllComments ? comments.length : 3).map((c, index) => (
              <CommentItem key={index} comment={c} formatDate={formatDate} />
            ))}
            <button
              onClick={toggleComments}
              className="mt-2 text-blue-500 dark:text-blue-400"
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
