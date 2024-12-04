import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Modal from "../Modal/Modal";

const ForumPost = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [isLiked, setisLiked] = useState(data.isLiked);
  const [likeCount, setLikeCount] = useState(data.likeCount);

  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('id');

  const handleLike = () => {

  };

  const handleDelete = () => {

  };

  const handleUpdate = () => {

  };

  return (
    <div className="flex flex-col bg-softCream p-5 rounded-lg border border-black shadow-md mb-5">
      <div className="flex items-center mb-2">
        <img
          className="w-10 h-10 rounded-full mr-2"
          alt="User Avatar"
          src={data.profileImage}
        />
        <div className="flex flex-col">
          <span className="font-bold">{data.user_id}</span>
          <span className="text-xs text-gray-500">{data.createdAt}</span>
        </div>
      </div>
      <Link to={`/forum2/${data.id}`} className="font text-2xl font-bold mb-4 text-black mt-[15px]">
        {data.title}
      </Link>
      <div className="bg-softCream rounded-lg">
        {data.imageUrl && (
          <img className="w-full h-auto mb-[20px]" alt="Post Image" src={data.imageUrl} />
        )}
        <p className="text-lg">{data.caption}</p>
        <p className="text-sm text-gray-500">{data.hashtags}</p>
      </div>
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
            <span className="ml-2">{(data.replies || []).length}</span>
          </button>
        </div>
        {currentUserId == data.user_id && (
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
                <div className="border-t border-[#739646]"></div>
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
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

// ForumPost.propTypes = {
//   currentUserId: PropTypes.string, // Optional prop
// };

export default ForumPost;

// const ForumPost = ({data}) => {
//   console.log(data.title);
//   return <div>{data.caption}</div>;

// }; 
// export default ForumPost; 