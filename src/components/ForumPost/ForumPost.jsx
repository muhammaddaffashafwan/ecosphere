import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from "../Modal/Modal";

const ForumPost = ({ post }) => {
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="flex flex-col bg-softCream p-5 rounded-lg border border-black shadow-md mb-5">
      <a href={post.link} className="text-decoration-none text-inherit">
        
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
        
        <div className="bg-softCream p-4 rounded-lg mb-4">
          <div className="text-2xl font-bold mb-4 text-black">{post.title}</div>
          {post.showImage && post.imageUrl && (
            <img className="w-full h-auto mb-[20px]" alt="Post Image" src={post.imageUrl} />
          )}
          <p className="text-lg">{post.content}</p>
          <p className="text-sm text-gray-500">{post.tags}</p>
        </div>
      </a>
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center bg-transparent border-none cursor-pointer"
            onClick={handleLike}
          >
            <i
              className={`bi ${isLiked ? 'bi-heart-fill text-red-500' : 'bi-heart'}`}
            ></i>
            <span className="ml-2">{likeCount}</span>
          </button>
          <button
            type="button"
            className="flex items-center bg-transparent border-none cursor-pointer ml-4"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="bi bi-chat-text"></i>
            <span className="ml-2">{post.comments.length}</span>
          </button>
        </div>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

// Menambahkan validasi prop
ForumPost.propTypes = {
  post: PropTypes.shape({
    link: PropTypes.string.isRequired,
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
  }).isRequired,
};

export default ForumPost;
