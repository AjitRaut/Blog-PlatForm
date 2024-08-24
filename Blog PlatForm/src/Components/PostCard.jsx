import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { FaHeart, FaRegHeart, FaThumbsDown, FaRegThumbsDown } from "react-icons/fa";
import { doc, updateDoc, arrayUnion, arrayRemove, increment, serverTimestamp, getDoc } from "firebase/firestore";

const PostCard = ({ post }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRef = doc(db, "posts", post.id);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          const data = postDoc.data();
          setComments(data.comments || []);
          setLikes(data.likes || 0);
          setDislikes(data.dislikes || 0);
          const currentUser =  post.author || "Anonymous";  // Replace with actual user ID
          setHasLiked(data.likers?.includes(currentUser) || false);
          setHasDisliked(data.dislikers?.includes(currentUser) || false);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post data: ", error);
      }
    };

    fetchPostData();
  }, [post.id]);

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
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

  const formattedDate = post.createdAt
    ? formatDate(new Date(post.createdAt.toDate()))
    : "Date not available";

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    if (comment.trim()) {
      const currentUser = post.author || "Anonymous";
      const newComment = {
        text: comment,
        date: new Date(),
        author: currentUser,
      };
  
      // Optimistically update the UI
      setComments((prevComments) => [...prevComments, newComment]);
      setComment("");
  
      try {
        const postRef = doc(db, "posts", post.id);
  
        // Update Firestore with the new comment
        await updateDoc(postRef, {
          comments: arrayUnion(newComment),
        });
  
        // Fetch updated post data to ensure consistency
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          setComments(postDoc.data().comments || []);
        }
      } catch (error) {
        console.error("Error adding comment: ", error);
  
        // Rollback optimistic update if there's an error
        setComments((prevComments) => prevComments.filter((c) => c !== newComment));
      }
    }
  };
  

  const handleLike = async () => {
    try {
      const postRef = doc(db, "posts", post.id);
      const currentUser = post.author || "Anonymous"; // Replace with actual user ID

      if (hasLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          likers: arrayRemove(currentUser),
        });
        setHasLiked(false);
        setLikes(likes - 1);
      } else {
        await updateDoc(postRef, {
          likes: increment(1),
          likers: arrayUnion(currentUser),
          dislikers: arrayRemove(currentUser),
        });
        setHasLiked(true);
        setHasDisliked(false);
        setLikes(likes + 1);
        if (hasDisliked) {
          setDislikes(dislikes - 1);
        }
      }
    } catch (error) {
      console.error("Error handling like: ", error);
    }
  };

  const handleDislike = async () => {
    try {
      const postRef = doc(db, "posts", post.id);
      const currentUser =  post.author || "Anonymous";  // Replace with actual user ID

      if (hasDisliked) {
        await updateDoc(postRef, {
          dislikes: increment(-1),
          dislikers: arrayRemove(currentUser),
        });
        setHasDisliked(false);
        setDislikes(dislikes - 1);
      } else {
        await updateDoc(postRef, {
          dislikes: increment(1),
          dislikers: arrayUnion(currentUser),
          likers: arrayRemove(currentUser),
        });
        setHasDisliked(true);
        setHasLiked(false);
        setDislikes(dislikes + 1);
        if (hasLiked) {
          setLikes(likes - 1);
        }
      }
    } catch (error) {
      console.error("Error handling dislike: ", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 dark:bg-gray-800">
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        {post.title}
      </h3>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-auto mb-2 rounded"
        />
      )}
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
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        By {post.author} | {formattedDate}
      </p>
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
      </div>
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

export default PostCard;
