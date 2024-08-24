import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, increment, serverTimestamp, getDoc } from "firebase/firestore";

const PostCard = ({ post }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [likes, setLikes] = useState(post.likes || 0);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postRef = doc(db, "posts", post.id);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          const data = postDoc.data();
          setComments(data.comments || []);
          setLikes(data.likes || 0);
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
      const optimisticComment = {
        text: comment,
        date: new Date(), // Use local date/time for optimistic UI update
        author: currentUser,
      };

      // Optimistically update the UI
      setComments([...comments, optimisticComment]);
      setComment(""); // Clear the comment input right away

      try {
        const postRef = doc(db, "posts", post.id);

        // Update the document with serverTimestamp
        await updateDoc(postRef, {
          commentTimestamp: serverTimestamp(),
        });

        // Get the updated timestamp from Firestore
        const postDoc = await getDoc(postRef);
        const currentTimestamp = postDoc.data().commentTimestamp;

        // Create the new comment with the correct timestamp from Firestore
        const newComment = {
          text: comment,
          date: currentTimestamp, // Use the fetched server timestamp
          author: currentUser,
        };

        // Add the new comment to Firestore using arrayUnion
        await updateDoc(postRef, {
          comments: arrayUnion(newComment),
        });

        // Re-fetch comments to ensure everything is synced
        if (postDoc.exists()) {
          setComments(postDoc.data().comments || []);
        }
      } catch (error) {
        console.error("Error adding comment: ", error);
        // If an error occurs, remove the optimistic comment (optional)
        setComments((prevComments) =>
          prevComments.filter((c) => c !== optimisticComment)
        );
      }
    }
  };

  const handleLike = async () => {
    try {
      const postRef = doc(db, "posts", post.id);
      await updateDoc(postRef, {
        likes: increment(1)
      });

      // Re-fetch likes after liking the post
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        setLikes(postDoc.data().likes || 0);
      }
    } catch (error) {
      console.error("Error liking post: ", error);
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
      <div className="mt-4">
        <button onClick={handleLike} className="text-blue-500 dark:text-blue-400">
          Like {likes}
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
