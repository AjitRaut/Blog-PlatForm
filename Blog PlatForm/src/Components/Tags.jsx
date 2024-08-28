import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const Tags = () => {
    const [selectedTag, setSelectedTag] = useState('');
    const [posts, setPosts] = useState([]);

    const tags = ['React', 'Firebase', 'JavaScript', 'CSS'];

    useEffect(() => {
        const fetchPosts = async () => {
            if (selectedTag) {
                const q = query(collection(db, 'posts'), where('tags', 'array-contains', selectedTag));
                const querySnapshot = await getDocs(q);
                const postsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPosts(postsData);
            }
        };
        fetchPosts();
    }, [selectedTag]);

    return (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-8 dark:bg-gray-900">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Tags</h2>
            <div className="mb-4">
                {tags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 mr-2 mb-2 rounded ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div>
                {selectedTag && (
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        Posts tagged with "{selectedTag}"
                    </h3>
                )}
                {posts.length > 0 ? (
                    <ul>
                        {posts.map(post => (
                            <li key={post.id} className="mb-4">
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{post.title}</h4>
                                <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700 dark:text-gray-300">No posts available with this tag.</p>
                )}
            </div>
        </div>
    );
};

export default Tags;
