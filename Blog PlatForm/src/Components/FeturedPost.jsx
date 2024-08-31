import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import PostCard from './PostCard';

const FeaturedPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const postsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setPosts(postsData);
        });

        return () => unsubscribe();
    }, []);

    return ( posts ? 
        <section className="container mx-auto my-8 px-4">
            <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </section>
   :  <h2 className="text-2xl font-bold mt-5 mb-6 text-center">No Post Available</h2>);
};

export default FeaturedPosts;
