import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebase';
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                try {
                    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        setUsername(userDoc.data().username || "");
                    } else {
                        // Redirect to login if user is authenticated but not in the database
                        console.log("User not found in database. Redirecting to login.");
                        navigate('/login');
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                }
            } else {
                setUser(null);
                setUsername("");
                navigate('/login'); // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content || !category) {
            setError('Title, content, and category are required');
            return;
        }
        setUploading(true);
        let imageUrl = '';

        if (image) {
            const imageRef = ref(storage, `posts/${image.name}-${Date.now()}`);
            const uploadTask = uploadBytesResumable(imageRef, image);

            uploadTask.on('state_changed',
                snapshot => {
                    const progressPercentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgress(progressPercentage);
                },
                error => {
                    setError('Error uploading image');
                    setUploading(false);
                },
                async () => {
                    imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                    savePost(imageUrl);
                }
            );
        } else {
            savePost(imageUrl);
        }
    };

    const savePost = async (imageUrl) => {
        try {
            await addDoc(collection(db, 'posts'), {
                title,
                content,
                imageUrl,
                author: username,
                category,
                tags: ['React', 'JavaScript'], 
                createdAt: new Date(),
            });
            setTitle('');
            setContent('');
            setImage(null);
            setCategory('');
            setError('');
            setUploading(false);
            setProgress(0);
        } catch (err) {
            setError('Error adding post');
            setUploading(false);
            setProgress(0);
        }
    };

    const categories = ['Technology', 'Lifestyle', 'Education', 'Health'];

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-auto mt-8 dark:bg-gray-900">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Create a Post</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                    rows="4"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300">Upload Image</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
            </div>
            {uploading && (
                <div className="mb-4">
                    <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                            <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:bg-blue-600 dark:text-blue-200">
                                    Uploading...
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-200">
                                    {Math.round(progress)}%
                                </span>
                            </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-800">
                            <div
                                style={{ width: `${progress}%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-400"
                            ></div>
                        </div>
                    </div>
                </div>
            )}
            <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-600 dark:text-white"
                disabled={uploading}
            >
                {uploading ? 'Uploading...' : 'Add Post'}
            </button>
        </form>
    );
};

export default PostForm;
