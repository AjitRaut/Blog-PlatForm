// components/AdminPanel.js
const AdminPanel = ({ users = [], posts = [] }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

      <h2 className="text-2xl font-semibold mb-2">User Management</h2>
      <ul className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <li key={user.id} className="border p-4 rounded shadow-lg">
              <p>
                <strong>{user.name}</strong> ({user.email})
              </p>
              <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded">
                Delete User
              </button>
            </li>
          ))
        ) : (
          <p>No users available.</p>
        )}
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-2">Post Management</h2>
      <ul className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.id} className="border p-4 rounded shadow-lg">
              <p>
                <strong>{post.title}</strong> (by {post.author})
              </p>
              <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded">
                Edit Post
              </button>
              <button className="mt-2 bg-red-500 text-white py-2 px-4 rounded">
                Delete Post
              </button>
            </li>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </ul>
    </div>
  );
};

export default AdminPanel;
