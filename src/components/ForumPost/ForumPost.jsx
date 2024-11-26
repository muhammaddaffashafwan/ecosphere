import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from "../Modal/Modal";

const ForumPost = ({ post, currentUserId }) => {
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleDelete = () => {
    // Handle deletion logic here
    console.log('Post deleted');
    setIsMoreOptionsOpen(false); // Close the more options menu
  };

  const handleUpdate = () => {
    // Handle update logic here
    console.log('Post updated');
    setIsMoreOptionsOpen(false); // Close the more options menu
  };

  const isUserPost = post.userId === currentUserId; // Check if the post belongs to the current user

  return (
    <div className="flex flex-col bg-softCream p-5 rounded-lg border border-black shadow-md mb-5">
      {/* User avatar and details */}
      <div className="flex items-center mb-2">
        <img
          className="w-10 h-10 rounded-full mr-2"
          alt="User Avatar"
          src={post.userAvatar}
        />
        <div className="flex flex-col">
          <span className="font-bold">{post.userName}</span>
          <span className="text-xs text-gray-500">{post.date}</span>
        </div>
      </div>

      {/* Post Title with Link to Forum2 */}
      <Link to={`/forum2/${post.id}`} className="font text-2xl font-bold mb-4 text-black mt-[15px]">
        {post.title}
      </Link>

      {/* Post Content */}
      <div className="bg-softCream rounded-lg">
        {post.showImage && post.imageUrl && (
          <img className="w-full h-auto mb-[20px]" alt="Post Image" src={post.imageUrl} />
        )}
        <p className="text-lg">{post.content}</p>
        <p className="text-sm text-gray-500">{post.tags}</p>
      </div>

      {/* Like and Message Buttons */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-[30px]">
          <button
            type="button"
            className="flex items-center bg-transparent border-none cursor-pointer"
            onClick={handleLike}
          >
            <i
              className={`bi ${isLiked ? 'bi-heart-fill text-red-500' : 'bi-heart'} text-2xl`}
            ></i>
            <span className="ml-2">{likeCount}</span>
          </button>
          <button
            type="button"
            className="flex items-center bg-transparent border-none cursor-pointer ml-4"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="bi bi-chat-text text-2xl"></i>
            <span className="ml-2">{post.comments.length}</span>
          </button>
        </div>

        {/* More Options (Only visible for the post owner) */}
        {isUserPost && (
  <div className="relative">
    <button
      className="flex items-center justify-center text-2xl"
      onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
    >
      <i className="bi bi-three-dots"></i>
    </button>
    {isMoreOptionsOpen && (
      <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 border-2 border-[#739646]">
        <button
          className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
          onClick={handleUpdate}
        >
          Update
        </button>
        <div className="border-t border-[#739646]"></div> {/* Divider line */}
        <button
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    )}
  </div>
)}

      </div>

      {/* Modal for comments */}
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

ForumPost.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userAvatar: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    likes: PropTypes.number,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        content: PropTypes.string,
      })
    ).isRequired,
    showImage: PropTypes.bool,
    imageUrl: PropTypes.string,
    userId: PropTypes.string.isRequired, // Added userId to identify the post owner
  }).isRequired,
  currentUserId: PropTypes.string.isRequired, // Added currentUserId as a prop
};

export default ForumPost;
