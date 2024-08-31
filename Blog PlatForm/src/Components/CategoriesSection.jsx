import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [posts, setPosts] = useState([]);
  const [expandedPostIds, setExpandedPostIds] = useState([]);

  const categories = ["Technology", "Lifestyle", "Education", "Health"];

  useEffect(() => {
    const fetchPosts = async () => {
      if (selectedCategory) {
        const q = query(
          collection(db, "posts"),
          where("category", "==", selectedCategory)
        );
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsData);
      }
    };
    fetchPosts();
  }, [selectedCategory]);

  const toggleReadMore = (postId) => {
    if (expandedPostIds.includes(postId)) {
      setExpandedPostIds(expandedPostIds.filter((id) => id !== postId));
    } else {
      setExpandedPostIds([...expandedPostIds, postId]);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-8 dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Categories
      </h2>
      <div className="mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 mr-2 mb-2 rounded ${
              selectedCategory === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            } dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div>
        {selectedCategory && (
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            Posts in "{selectedCategory}"
          </h3>
        )}
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => {
              const isExpanded = expandedPostIds.includes(post.id);
              const contentPreview =
                post.content.length > 100
                  ? post.content.substring(0, 100) + "..."
                  : post.content;

              return (
                <li key={post.id} className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {isExpanded ? post.content : contentPreview}
                  </p>
                  <button
                    onClick={() => toggleReadMore(post.id)}
                    className="text-blue-500 dark:text-blue-300"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            No posts available in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Categories;
