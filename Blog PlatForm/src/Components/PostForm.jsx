import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) {
            setError('Title and content are required');
            return;
        }

        try {
            await addDoc(collection(db, 'posts'), {
                title,
                content,
                imageUrl,
                author: auth.currentUser.displayName,
                createdAt: new Date(),
            });

            setTitle('');
            setContent('');
            setImageUrl('');
            setError('');
        } catch (err) {
            setError('Error adding post');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-8">
            <h2 className="text-xl font-bold mb-4">Create a Post</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    rows="4"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Post</button>
        </form>
    );
};

export default PostForm;
