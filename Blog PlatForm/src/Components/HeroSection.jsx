import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <div className="bg-blue-800 dark:bg-gray-900 text-white p-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to MyBlog</h1>
            <p className="text-lg mb-6">Discover amazing articles on a variety of topics.</p>
            <Link to="/signup" className="bg-white text-blue-800 py-2 px-4 rounded-full shadow-md hover:bg-gray-100">
                Get Started
            </Link>
        </div>
    );
}

export default HeroSection;
