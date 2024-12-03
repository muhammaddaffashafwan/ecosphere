import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams, useNavigate } from 'react-router-dom'; // Added useNavigate for redirect after update/delete
import Modal from "../Modal/Modal";

const ForumPost = ({ currentUserId }) => {
  const { id } = useParams(); // Extracting the id from the URL parameter
  const [post, setPost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Added navigate for redirect

  const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage

  useEffect(() => {
    console.log('Post ID:', id); // Debug log to check the id value

    if (!id) {
      setError("Post ID is missing or invalid.");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`http://localhost:5000/get-forum/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in the request header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error("Post not found.");
        }
        setPost(data);
        setLikeCount(data.likes || 0);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch post data: ${error.message}`);
        setLoading(false);
      });
  }, [id, token]); // Added token as dependency

  useEffect(() => {
    if (post && currentUserId) {
      fetch(`http://localhost:5000/like-forum/${id}/${currentUserId}`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in the request header
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setIsLiked(data.isLiked);
          setLikeCount(data.likeCount);
        })
        .catch((error) => console.error("Error fetching like data:", error));
    }
  }, [post, currentUserId, id, token]);

  const handleLike = () => {
    const action = isLiked ? 'unlike' : 'like';
    fetch(`http://localhost:5000/like-forum/${id}/${currentUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include token in the request header
      },
      body: JSON.stringify({ action }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLiked(data.isLiked);
        setLikeCount(data.likeCount);
      })
      .catch((error) => console.error("Error updating like:", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/delete-forum/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in the request header
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Post deleted');
          navigate('/forum'); // Redirect to forum page after deletion
        } else {
          console.error('Failed to delete post');
        }
      })
      .catch((error) => console.error("Error deleting post:", error));
    setIsMoreOptionsOpen(false);
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/update-forum/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in the request header
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Post updated');
          navigate(`/forum2/${id}`); // Redirect to the post detail page after update
        } else {
          console.error('Failed to update post');
        }
      })
      .catch((error) => console.error("Error updating post:", error));
    setIsMoreOptionsOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const isUserPost = post.userId === currentUserId;

  return (
    <div className="flex flex-col bg-softCream p-5 rounded-lg border border-black shadow-md mb-5">
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
      <Link to={`/forum2/${post.id}`} className="font text-2xl font-bold mb-4 text-black mt-[15px]">
        {post.title}
      </Link>
      <div className="bg-softCream rounded-lg">
        {post.showImage && post.imageUrl && (
          <img className="w-full h-auto mb-[20px]" alt="Post Image" src={post.imageUrl} />
        )}
        <p className="text-lg">{post.content}</p>
        <p className="text-sm text-gray-500">{post.tags}</p>
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
            <span className="ml-2">{(post.comments || []).length}</span>
          </button>
        </div>
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

ForumPost.propTypes = {
  currentUserId: PropTypes.string, // Optional prop
};

export default ForumPost;
