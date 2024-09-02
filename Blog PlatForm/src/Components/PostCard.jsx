import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import PostContent from "./PostContent";
import LikeDislikeButtons from "./PostLikeDislike";
import CommentSection from "./CommentSection";
import Shimmer from "./ShimmerUi";

const PostCard = ({ post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [dislikes, setDislikes] = useState(post?.dislikes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const auth = getAuth();
  const currentUserId = auth.currentUser?.uid;

  const fetchUserData = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data().username; // Adjust according to your user document structure
      } else {
        console.error("User data not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      return null;
    }
  };

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
  }, [post.id, currentUserId]);

  const handleAddComment = async () => {
    if (comment.trim() && currentUserId) {
      try {
        // Fetch the current user's username
        const username = await fetchUserData(currentUserId);
        if (!username) {
          throw new Error("Username not found");
        }

        const newComment = {
          text: comment,
          date: new Date(),
          author: username, // Use the username here
        };

        setComments((prevComments) => [...prevComments, newComment]);
        setComment("");

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
        // Optionally handle the error by reverting state changes
        setComments((prevComments) =>
          prevComments.filter((c) => c !== newComment)
        );
      }
    }
  };

  const handleLike = async () => {
    if (!currentUserId) return;

    try {
      const postRef = doc(db, "posts", post.id);

      if (hasLiked) {
        await updateDoc(postRef, {
          likes: increment(-1),
          likers: arrayRemove(currentUserId),
        });
        setHasLiked(false);
        setLikes(likes > 0 ? likes - 1 : 0);
      } else {
        await updateDoc(postRef, {
          likes: increment(1),
          likers: arrayUnion(currentUserId),
          dislikes: hasDisliked ? increment(-1) : increment(0),
          dislikers: hasDisliked ? arrayRemove(currentUserId) : arrayUnion(),
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
    if (!currentUserId) return;

    try {
      const postRef = doc(db, "posts", post.id);

      if (hasDisliked) {
        await updateDoc(postRef, {
          dislikes: increment(-1),
          dislikers: arrayRemove(currentUserId),
        });
        setHasDisliked(false);
        setDislikes(dislikes > 0 ? dislikes - 1 : 0);
      } else {
        await updateDoc(postRef, {
          dislikes: increment(1),
          dislikers: arrayUnion(currentUserId),
          likes: hasLiked ? increment(-1) : increment(0),
          likers: hasLiked ? arrayRemove(currentUserId) : arrayUnion(),
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

  // Render Shimmer if post data is not yet loaded
  if (!post || Object.keys(post).length === 0) {
    return <Shimmer />;
  }

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
      />
    </div>
  );
};

export default PostCard;
