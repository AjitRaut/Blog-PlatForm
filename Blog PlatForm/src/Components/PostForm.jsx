// components/PostForm.js
const PostForm = ({ onSubmit, post }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {post ? "Edit Post" : "Create Post"}
      </h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          defaultValue={post?.title || ""}
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          defaultValue={post?.content || ""}
          placeholder="Content"
          className="w-full p-2 border rounded"
          rows="10"
          required
        ></textarea>
        <input
          type="text"
          defaultValue={post?.categories || ""}
          placeholder="Categories (comma separated)"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          defaultValue={post?.tags || ""}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {post ? "Update Post" : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
