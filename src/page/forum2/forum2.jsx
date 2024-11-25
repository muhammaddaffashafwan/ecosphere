import { useParams } from 'react-router-dom';
import { DataPost } from '../../components/ForumPost/DataPost';

export function Forum2() {
  const { postId } = useParams();  // Extracting postId from the URL
  const post = DataPost.find((item) => item.id === parseInt(postId));  // Matching postId with DataPost.id

  if (!post) {
    return <div>Post not found</div>;  // If no post is found with the given ID, show a "not found" message
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-700 mt-4">{post.content}</p>
      <p className="text-gray-500 mt-2">Last Answer: {post.lastAnswer || "N/A"}</p>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mt-4 w-full max-w-md" />}
    </div>
  );
}

export default Forum2;
