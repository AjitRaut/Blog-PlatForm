// components/PostLayout.js
import { useParams } from 'react-router-dom';

const PostLayout = ({ posts }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === parseInt(id));

  return (
    <div className="container mx-auto p-4">
      <article className="border p-4 rounded shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 mb-4">By {post.author} on {post.date}</p>
        <div className="mb-4">{post.content}</div>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Comments</h2>
          
          <form className="mt-4">
            <textarea className="w-full p-2 border rounded" placeholder="Add a comment..."></textarea>
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded" type="submit">Post Comment</button>
          </form>
        </div>
      </article>
    </div>
  );
};

export default PostLayout;
