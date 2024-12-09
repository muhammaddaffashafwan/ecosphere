import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import Modal from "../Modal/Modal";
import axios from "axios";

const ForumPost = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(data.isLiked);
  const [likeCount, setLikeCount] = useState(data.likeCount);

  // States for Update/Delete modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const token = localStorage.getItem('token');
  const currentUserId = localStorage.getItem('id');

  const handleLike = async () => {
    const postId = data.id;
  
    if (!token) {
      alert("Please log in to like the post");
      return;
    }
  
    try {
      // Toggle the like status (send POST or DELETE request based on isLiked)
      const response = await fetch(`http://localhost:5000/like-forum/${postId}/like`, {
        method: isLiked ? 'DELETE' : 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response is ok
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to update like status: ${error.message}`);
      }
  
      // Parse the response data
      const result = await response.json();
  
      // Update state if response contains like status and count
      setIsLiked(result.isLiked);  // Update the liked status
      setLikeCount(result.likeCount);  // Update the like count
  
    } catch (error) {
      console.error("Error handling like:", error);
      alert("An error occurred while handling the like.");
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/delete-forum/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.message);

      setIsDeleteModalOpen(false); // Close the delete confirmation modal
    } catch (error) {
      console.error('Error deleting forum post:', error.response ? error.response.data : error.message);
    }
  };

  const handleUpdate = async (id, title, caption, hashtags, imageUrl) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-forum/${id}`,
        {
          title,
          caption,
          hashtags,
          image_url: imageUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.message);

      setIsUpdateModalOpen(false); // Close the update confirmation modal
    } catch (error) {
      console.error('Error updating forum post:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col bg-softCream p-5 rounded-lg border border-black shadow-md mb-5">
      <div className="flex items-center mb-2">
        <img className="w-10 h-10 rounded-full mr-2" alt="User Avatar" src={data.profileImage} />
        <div className="flex flex-col">
          <span className="font-bold">{data.uname}</span>
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
          <button type="button" className="flex items-center bg-transparent border-none cursor-pointer" onClick={handleLike}>
            <i className={`bi ${isLiked ? 'bi-heart-fill text-red-500' : 'bi-heart'} text-2xl`}></i>
            <span className="ml-2">{likeCount}</span>
          </button>
          <button type="button" className="flex items-center bg-transparent border-none cursor-pointer ml-4" onClick={() => setIsModalOpen(true)}>
            <i className="bi bi-chat-text text-2xl"></i>
            <span className="ml-2">{(data.replies || []).length}</span>
          </button>
        </div>

        {currentUserId == data.user_id && (
          <div className="relative">
            <button className="flex items-center justify-center text-2xl" onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}>
              <i className="bi bi-three-dots"></i>
            </button>
            {isMoreOptionsOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 border-2 border-[#739646]">
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg" onClick={() => setIsUpdateModalOpen(true)}>
                  Update
                </button>
                <div className="border-t border-[#739646]"></div>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg" onClick={() => setIsDeleteModalOpen(true)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
      
      {/* Update Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Update Post</h2>
            <form>
              <input type="text" defaultValue={data.title} className="w-full mb-3 p-2 border" placeholder="Title" />
              <textarea defaultValue={data.caption} className="w-full mb-3 p-2 border" placeholder="Caption" />
              <input type="text" defaultValue={data.hashtags} className="w-full mb-3 p-2 border" placeholder="Hashtags" />
              <input type="text" defaultValue={data.imageUrl} className="w-full mb-3 p-2 border" placeholder="Image URL" />
              <div className="flex justify-between mt-3">
                <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setIsUpdateModalOpen(false)}>
                  Cancel
                </button>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleUpdate(data.id, data.title, data.caption, data.hashtags, data.imageUrl)}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this post?</h2>
            <div className="flex justify-between mt-3">
              <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </button>
              <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(data.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPost;
