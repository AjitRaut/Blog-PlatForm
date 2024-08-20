// FeaturedPosts.jsx
import React from 'react';

const FeaturedPosts = ({ posts }) => {
  return (
    <div className="featured-posts-container">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Featured Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div 
            key={post.id} 
            className="featured-post p-4 bg-white shadow-md rounded-lg dark:bg-gray-800 dark:text-white"
          >
            <img 
              src={post.thumbnail} 
              alt={post.title} 
              className="w-full h-48 object-cover rounded-md mb-4" 
            />
            <h3 className="text-xl font-semibold mb-2 dark:text-gray-100">{post.title}</h3>
            <p className="text-gray-600 mb-2 dark:text-gray-300">{post.excerpt}</p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span>By {post.author}</span> | <span>{post.date}</span>
            </div>
            <div className="mt-3">
              <button className="text-blue-600 hover:underline dark:text-blue-400">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
