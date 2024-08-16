// components/UserProfile.js
const UserProfile = ({ user }) => {
    if (!user) {
      return <p className="text-center text-red-500">User not found</p>;
    }
  
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <img
            src={user.profilePicture || 'default-profile-picture-url.jpg'} // Fallback to a default image if profilePicture is undefined
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold mb-2">{user.name || 'Anonymous'}</h1>
          <p className="text-gray-600">{user.bio || 'No bio available'}</p>
        </div>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Posts</h2>
        <div className="space-y-4">
          {user.posts && user.posts.length > 0 ? (
            user.posts.map((post) => (
              <div key={post.id} className="border p-4 rounded shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p>{post.excerpt}</p>
                <a
                  href={`/post/${post.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </div>
      </div>
    );
  };
  
  export default UserProfile;
  