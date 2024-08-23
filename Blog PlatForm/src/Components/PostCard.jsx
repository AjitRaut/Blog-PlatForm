import React, { useState } from 'react';

const PostCard = ({ post }) => {
    console.log(post)
    const [showFullContent, setShowFullContent] = useState(false);

    const toggleContent = () => {
        setShowFullContent(!showFullContent);
    };

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };
    const formattedDate = post.createdAt ? formatDate(new Date(post.createdAt.toDate())) : 'Date not available';

    return (
        <div className="bg-white p-4 rounded shadow-md mb-4 dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
            {post.imageUrl && (
                <img src={post.imageUrl} alt={post.title} className="w-full h-auto mb-2 rounded" />
            )}
            <p className="text-gray-700 dark:text-gray-300">
                {showFullContent ? post.content : `${post.content.substring(0, 100)}...`}
            </p>
            <button
                onClick={toggleContent}
                className="mt-2 text-blue-500 dark:text-blue-400"
            >
                {showFullContent ? 'Read Less' : 'Read More'}
            </button>
            {/* <p className="mt-2 text-gray-600 dark:text-gray-400">Category: {post.category}</p> */}
            <p className="mt-2 text-gray-600 dark:text-gray-400">By {post.author} | {formattedDate}</p>
        </div>
    );
};

export default PostCard;
