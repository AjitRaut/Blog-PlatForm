import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import { auth, db } from "../firebase"; // Import auth and db
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import postsData from '../utils/Post.json'; // Adjust the path based on your folder structure
import FeaturedPosts from "./FeturedPost";
import PostForm from "./PostForm";

function HeroSection() {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUsername(userDoc.data().username || "");
          } else {
            console.log("No such document!");
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUser(null);
        setUsername("");
      }
    });

    return () => unsubscribe();
  }, []);


    return (
        <>
        <div className="bg-blue-800 dark:bg-gray-900 text-white p-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to MyBlog {username}</h1>
            <p className="text-lg mb-6">Discover amazing articles on a variety of topics.</p>
            <Link to="/signup" className="bg-white text-blue-800 py-2 px-4 rounded-full shadow-md hover:bg-gray-100">
                Get Started
            </Link>
        </div>
        <PostForm />
    <FeaturedPosts posts={postsData} />
        </>
    );
}

export default HeroSection;
