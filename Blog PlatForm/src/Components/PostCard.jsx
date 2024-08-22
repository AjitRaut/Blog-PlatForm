import React from 'react';

const PostCard = ({ post }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            {post.imageUrl && (
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                />
            )}
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <p className="text-gray-500 text-sm">By {post.author} | {post.createdAt.toDate().toLocaleDateString()}</p>
            <a href="#" className="text-blue-500 font-semibold mt-2">Read More</a>
        </div>
    );
};

export default PostCard;
