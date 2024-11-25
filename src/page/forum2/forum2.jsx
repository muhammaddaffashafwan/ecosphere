import { useParams } from 'react-router-dom';
import { DataPost } from '../../components/ForumPost/DataPost';

export function Forum2() {
  const { postId } = useParams();
  const post = DataPost.find((item) => item.id === parseInt(postId));

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-gray-700 mt-4">{post.content}</p>
      <p className="text-gray-500 mt-2">Last Answer: {post.lastAnswer}</p>
    </div>
  );
}

export default Forum2;
