// components/CommentSection.js
const CommentSection = ({ comments, onAddComment }) => {
  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-2">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border p-4 rounded shadow-lg">
            <p>
              <strong>{comment.author}</strong>{" "}
              <span className="text-gray-600">on {comment.date}</span>
            </p>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={onAddComment} className="mt-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Add a comment..."
          required
        ></textarea>
        <button
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
          type="submit"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
