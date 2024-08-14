// components/Homepage.js
import { Link } from 'react-router-dom';

const Homepage = ({ posts }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Recent Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map(post => (
          <div key={post?.id} className="border p-4 rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-2">
              <Link to={`/post/${post?.id}`} className="hover:underline">{post?.title}</Link>
            </h2>
            <p>{post?.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
