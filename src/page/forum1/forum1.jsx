import { Link } from 'react-router-dom';
import { DataPost } from "../../components/ForumPost/DataPost";
import ForumPost from "../../components/ForumPost/ForumPost";

export function Forum1() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-5 flex">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-5">Forum Discussions</h1>
          <div className="flex flex-col gap-5">
            {DataPost.map((post) => (
              <Link key={post.id} to={`/forum2/${post.id}`}>
                <ForumPost post={post} />
              </Link>
            ))}
          </div>
        </div>
        <div className="w-1/3 ml-5">
          <h2 className="text-2xl font-bold mb-4">Questions for You</h2>
          {/* Form to add new question */}
          <input
            type="text"
            placeholder="Ask a new question..."
            className="border p-2 rounded w-full mt-4"
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add Question
          </button>
        </div>
      </main>
    </div>
  );
}

export default Forum1;
