import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "../../components/Modal/Modal";
import ForumReply from "../../components/ForumReply/ForumReply"; // Import ForumReply
import { initialComments } from "../../components/CommentsData/CommentsData"; // Import comments data from CommentsData.js
import axios from "axios";

export function Forum2() {
  const { postId } = useParams(); // Extracting postId from the URL
  const navigate = useNavigate(); // Hook to navigate between routes
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/get-forum/${postId}`, {
          headers: {
            Authorization: token,
          },
        });
        setPost(response.data);
        setLikeCount(response.data.likes || 0);
      } catch (error) {
        setError(`Failed to fetch post data: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId, token, navigate]);

  if (loading) return <div className='text-center mt-10 text-2xl'>Loading...</div>;
  if (error) return <div className='text-center mt-10 text-2xl text-red-500'>{error}</div>;
  if (!post) return <div className='text-center mt-10 text-2xl'>Post not found</div>;

  const handleLike = () => {
    setIsLiked((prev) => !prev);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const filteredComments = comments.filter((comment) => comment.postId === parseInt(postId));
  const isUserPost = post.userId === 1; // Replace 1 with the current user's ID (this is just an example)

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/delete-forum/${post.id}`, {
        headers: {
          Authorization: token,
        },
      });
      alert("Post deleted successfully");
      navigate("/forum1");
    } catch (error) {
      console.error('Error deleting forum post:', error.response?.data || error.message);
      alert("Failed to delete post");
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update-forum/${post.id}`,
        updatedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Post updated successfully");
      setPost(response.data);
    } catch (error) {
      console.error('Error updating forum post:', error.response?.data || error.message);
      alert("Failed to update post");
    }
  };

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
              src={post.profilImage}
              alt={post.username}
              className='w-14 h-14 rounded-full mr-4'
            />
            <div>
              <h2 className='text-xl font-semibold'>{post.username}</h2>
              <p className='text-gray-500 text-sm'>{post.createdAt}</p>
            </div>
          </div>
        </div>

        <h1 className='font text-3xl font-bold mb-4'>{post.title}</h1>

        {post.imageUrl && (
          <img src={post.imageUrl} alt={post.title} className='w-full h-auto mb-6 rounded-lg' />
        )}

        <p className='text-lg text-gray-700 leading-relaxed mb-4'>{post.caption}</p>
        <p className='text-sm text-gray-600 mb-6'>{post.hashtags}</p>

        <div className='flex justify-between items-center mt-4'>
          <div className='flex items-center gap-[30px]'>
            <button
              type='button'
              className='flex items-center bg-transparent border-none cursor-pointer'
              onClick={handleLike}
            >
              <i className={`bi ${isLiked ? "bi-heart-fill text-red-500" : "bi-heart"} text-2xl`}></i>
              <span className='ml-2'>{likeCount}</span>
            </button>
            <button
              type='button'
              className='flex items-center bg-transparent border-none cursor-pointer ml-4'
              onClick={() => setIsModalOpen(true)}
            >
              <i className='bi bi-chat-text text-2xl'></i>
              <span className='ml-2'>{filteredComments.length}</span>
            </button>
          </div>
        </div>

        {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}

        {/* Comments Section */}
        <div className='mt-8'>
          <ForumReply comments={filteredComments} setComments={setComments} />
        </div>

        {/* Display "More options" for user who is the author of the post */}
        {isUserPost && (
          <div className='relative'>
            <button
              className='flex items-center justify-center text-2xl'
              onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
            >
              <i className='bi bi-three-dots'></i>
            </button>
            {isMoreOptionsOpen && (
              <div className='absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40 border-2 border-[#739646]'>
                <button
                  className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded-lg'
                  onClick={() => handleUpdate({
                    title: post.title,
                    caption: post.caption,
                    hashtags: post.hashtags,
                    imageUrl: post.imageUrl,
                  })}
                >
                  Update
                </button>
                <div className='border-t border-[#739646]'></div>
                <button
                  className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-lg'
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Forum2;
