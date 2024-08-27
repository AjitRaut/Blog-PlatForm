import React from "react";
import { FaHeart, FaRegHeart, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";

const LikeDislikeButtons = ({ likes, dislikes, hasLiked, hasDisliked, handleLike, handleDislike }) => {
  return (
    <div className="mt-4 flex space-x-4">
      <button
        onClick={handleLike}
        className={`text-lg ${hasLiked ? 'text-red-500' : 'text-blue-500'} dark:text-blue-400`}
      >
        {hasLiked ? <FaHeart className="w-4 h-4" /> : <FaRegHeart className="w-4 h-4" />}
        {likes}
      </button>
      <button
        onClick={handleDislike}
        className={`text-lg ${hasDisliked ? 'text-red-500' : 'text-gray-500'} dark:text-gray-400`}
      >
        {hasDisliked ? <FaThumbsDown className="w-4 h-4" /> : <FaRegThumbsDown className="w-4 h-4" />}
        {dislikes}
      </button>
    </div>
  );
};

export default LikeDislikeButtons;
