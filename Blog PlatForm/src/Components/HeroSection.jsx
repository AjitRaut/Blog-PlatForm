import { Link } from "react-router-dom";
import { auth, db } from "../firebase"; // Import auth and db
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import postsData from '../utils/Post.json'; // Adjust the path based on your folder structure
import FeaturedPosts from "./FeturedPost";

function HeroSection() {
    const [username, setUsername] = useState("Unknown User");
    return (
        <>
        <div className="bg-blue-800 dark:bg-gray-900 text-white p-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to MyBlog</h1>
            <p className="text-lg mb-6">Discover amazing articles on a variety of topics.</p>
            <Link to="/signup" className="bg-white text-blue-800 py-2 px-4 rounded-full shadow-md hover:bg-gray-100">
                Get Started
            </Link>
        </div>
    <FeaturedPosts posts={postsData} />
        </>
    );
}

export default HeroSection;
