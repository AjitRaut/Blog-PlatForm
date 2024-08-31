
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove, increment, getDoc } from "firebase/firestore";
import PostContent from "./PostContent";
import LikeDislikeButtons from "./PostLikeDislike";
import CommentSection from "./CommentSection";

const PostCard = ({ post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

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
          const currentUserId = "CURRENT_USER_ID"; // Replace with actual user ID from auth context
          setHasLiked(data.likers?.includes(currentUserId) || false);
          setHasDisliked(data.dislikers?.includes(currentUserId) || false);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post data: ", error);
      }
    };
  
    fetchPostData();
  }, [post.id]);
  

  const handleAddComment = async () => {
    if (comment.trim()) {
      const currentUser = post.author || "Anonymous";
      const newComment = {
        text: comment,
        date: new Date(),
        author: currentUser,
      };

      setComments((prevComments) => [...prevComments, newComment]);
      setComment("");

      try {
        const postRef = doc(db, "posts", post.id);
        await updateDoc(postRef, {
          comments: arrayUnion(newComment),
        });

        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          setComments(postDoc.data().comments || []);
        }
      } catch (error) {
        console.error("Error adding comment: ", error);
        setComments((prevComments) => prevComments.filter((c) => c !== newComment));
      }
    }
  };

  const handleLike = async () => {
    try {
      const postRef = doc(db, "posts", post.id);
      const currentUser = post.author || "Anonymous";

      if (hasLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          likers: arrayRemove(currentUser),
        });
        setHasLiked(false);
        setLikes(likes > 0 ? likes - 1 : 0);
      } else {
        await updateDoc(postRef, {
          likes: increment(1),
          likers: arrayUnion(currentUser),
          dislikes: hasDisliked ? increment(-1) : increment(0),
          dislikers: hasDisliked ? arrayRemove(currentUser) : arrayUnion(),
        });
        setHasLiked(true);
        setLikes(likes + 1);

        if (hasDisliked) {
          setHasDisliked(false);
          setDislikes(dislikes > 0 ? dislikes - 1 : 0);
        }
      }
    } catch (error) {
      console.error("Error handling like: ", error);
    }
  };

  const handleDislike = async () => {
    try {
      const postRef = doc(db, "posts", post.id);
      const currentUser = post.author || "Anonymous";

      if (hasDisliked) {
        await updateDoc(postRef, {
          dislikes: increment(-1),
          dislikers: arrayRemove(currentUser),
        });
        setHasDisliked(false);
        setDislikes(dislikes > 0 ? dislikes - 1 : 0);
      } else {
        await updateDoc(postRef, {
          dislikes: increment(1),
          dislikers: arrayUnion(currentUser),
          likes: hasLiked ? increment(-1) : increment(0),
          likers: hasLiked ? arrayRemove(currentUser) : arrayUnion(),
        });
        setHasDisliked(true);
        setDislikes(dislikes + 1);

        if (hasLiked) {
          setHasLiked(false);
          setLikes(likes > 0 ? likes - 1 : 0);
        }
      }
    } catch (error) {
      console.error("Error handling dislike: ", error);
    }
  };

  const toggleComments = () => {
    setShowAllComments(!showAllComments);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md mb-4">
      <PostContent post={post} />
      <LikeDislikeButtons
        likes={likes}
        dislikes={dislikes}
        hasLiked={hasLiked}
        hasDisliked={hasDisliked}
        handleLike={handleLike}
        handleDislike={handleDislike}
      />
      <CommentSection
        comment={comment}
        comments={comments}
        setComment={setComment}
        handleAddComment={handleAddComment}
        showAllComments={showAllComments}
        toggleComments={toggleComments}
        formatDate={formatDate}
      />
    </div>
  );
};

export default PostCard;
