import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { DataPost } from "../../components/ForumPost/DataPost";
import Modal from "../../components/Modal/Modal";
import ForumReply from "../../components/ForumReply/ForumReply"; // Import ForumReply
import { initialComments } from "../../components/CommentsData/CommentsData"; // Import comments data from CommentsData.js

export function Forum2() {
  const { postId } = useParams(); // Extracting postId from the URL
  const navigate = useNavigate(); // Hook to navigate between routes
  const post = DataPost.find((item) => item.id === parseInt(postId)); // Matching postId with DataPost.id

  // If post is not found, show a message and return
  if (!post) {
    return <div className='text-center mt-10 text-2xl'>Post not found</div>;
  }

  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  // Initialize state for comments from CommentsData.js
  const [comments, setComments] = useState(initialComments);

  // Filter comments that match the current postId
  const filteredComments = comments.filter((comment) => comment.postId === parseInt(postId));

  // Split content into paragraphs by '\n' (newlines)
  const paragraphs = post.content.split("\n");

  return (
    <div className='min-h-screen bg-gray-50 pt-[100px] pb-[100px]'>
      <div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md'>
        {/* Header Section */}
        <div className='flex items-center mb-6 relative'>
          <button
            onClick={() => navigate("/forum1")}
            className='absolute top-0 right-0 p-2 text-gray-700 hover:text-blue-500'
          >
            <i className='bi bi-x-lg text-2xl'></i>
          </button>
          <div className='flex items-center'>
            <img
              src={post.userAvatar}
              alt={post.userName}
              className='w-14 h-14 rounded-full mr-4'
            />
            <div>
              <h2 className='text-xl font-semibold'>{post.userName}</h2>
              <p className='text-gray-500 text-sm'>{post.date}</p>
            </div>
          </div>
        </div>

        <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className='w-full h-auto mb-6 rounded-lg' />
        )}

        {paragraphs.map((paragraph, index) => (
          <p key={index} className='text-lg text-gray-700 leading-relaxed mb-4'>
            {paragraph}
          </p>
        ))}

        <p className='text-sm text-gray-600 mb-6'>{post.tags}</p>

        <div className='flex justify-between items-center mt-4'>
          <div className='flex items-center'>
            <button
              type='button'
              className='flex items-center bg-transparent border-none cursor-pointer'
              onClick={handleLike}
            >
              <i className={`bi ${isLiked ? "bi-heart-fill text-red-500" : "bi-heart"}`}></i>
              <span className='ml-2'>{likeCount}</span>
            </button>
            <button
              type='button'
              className='flex items-center bg-transparent border-none cursor-pointer ml-4'
              onClick={() => setIsModalOpen(true)}
            >
              <i className='bi bi-chat-text'></i>
              <span className='ml-2'>{filteredComments.length}</span>
            </button>
          </div>
        </div>

        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}

        {/* Comments Section */}
        <div className='mt-8'>
          <ForumReply comments={filteredComments} setComments={setComments} />
          {/* Integrate ForumReply component */}
        </div>
      </div>
    </div>
  );
}

export default Forum2;
