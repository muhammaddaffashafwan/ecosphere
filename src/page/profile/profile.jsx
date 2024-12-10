import { useState, useEffect } from "react";
import axios from "axios";
import ForumPost from "../../components/ForumPost/ForumPost";
import "../global.css";

const Profile = () => {
  const localprofileimage= localStorage.getItem("profile_image")
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localprofileimage
    ? `http://localhost:5000/${localprofileimage}`
    : "https://via.placeholder.com/150");
  const [name, setName] = useState(""); // Default value is an empty string
  const [username, setUsername] = useState(""); // Default value is an empty string
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("No token found, please log in again.");
    return;
  }

  // Fetch user profile data on load
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: token,
          },
        });
        console.log('__User data__:', response);

        // Use default values if response data is not available
        setName(response.data.name || ""); // Default to empty string
        setUsername(response.data.username || ""); // Default to empty string
        // setProfileImage(response.data.profile_image || 'https://via.placeholder.com/150');
        // setProfileImage(
        //   response.data.profile_image ?
        //   `https://localhost:5000/${response.data.profile_image}` : "https://via.placeholder.com/150"
        // )
        console.log(profileImage, response.data.profile_image)
        setUserId(response.data.id || null); // Store the user ID
      } catch (error) {
        console.log('__Error fetching user data__', error);
        alert('Error fetching user data, please try again!');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  // Fetch user posts on load
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!userId) return; // Only fetch posts if the userId is available

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/get-forum/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log('__User posts__:', response);

        // Ensure the response contains posts as an array
        if (Array.isArray(response.data.replies)) {
          setUserPosts(response.data.replies);
        } else {
          setUserPosts([]); // Default to empty array if no posts found
        }
      } catch (error) {
        console.error('__Error fetching posts__', error);
        alert('Error fetching posts, please try again!');
      } finally {
        setLoading(false);
      }

    };

    fetchUserPosts();
  }, [token, userId]);

  // Open edit profile modal
  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  // Close modal and reset image state
  const handleCloseModal = () => {
    setIsEditOpen(false);
    setNewProfileImage(null);
  };

  // Handle profile image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file);
    }
  };

  // Save profile changes
  const handleSaveProfile = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);

    if (newProfileImage) {
      formData.append("profile_image", newProfileImage); // Menambahkan gambar baru
    }

    try {
      const response = await axios.put("http://localhost:5000/profile-image", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data)

      // Update state dengan URL gambar profil baru dari backend
      // setProfileImage(response.data.data.profile_image); // Memperbarui URL gambar
      setProfileImage(`http://localhost:5000/${response.data.data.profile_image}`)
      localStorage.setItem("profile_image", response.data.data.profile_image)
      setName(name);
      setUsername(username);
      handleCloseModal(); // Tutup modal setelah menyimpan perubahan
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile, please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Header Section */}
      <div className="relative flex-shrink-0">
        <div className="h-[400px] relative">
          <img src="/images/bg_sampul.jpg" alt="Background" className="w-full h-full object-cover" />
        </div>

        {/* Profile Avatar and Details */}
        <div className="absolute top-[355px] left-[55px] flex items-center">
          <img className="w-24 h-24 rounded-full border-4 border-[#404d3c]" src={profileImage} alt="User Avatar" />
          <div className="ml-4 text-white">
            <h1 className="font text-2xl font-bold">{name}</h1>
            <p className="text-sm text-black">{username}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={handleEditClick}
          className="absolute top-[410px] right-[55px] px-[40px] py-2 rounded-full shadow-md bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:ring-[#5f7f33] hover:ring-2 active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all"
        >
          Edit Profile
        </button>
      </div>

      {/* Modal for Edit Profile */}
      {isEditOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/3 transition-all transform scale-100 opacity-100">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <form>
              {/* Edit Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Edit Username */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Change Profile Picture */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Change Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded-full mr-2">
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-4 py-2 rounded-full bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:ring-[#5f7f33] hover:ring-2 active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      
      {/* <div className="my-10 mx-4">
        <h2 className="text-xl font-bold mb-4">Your Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          Array.isArray(userPosts) && userPosts.length > 0 ? (
            userPosts.map((post) => <ForumPost key={post.id} post={post} />)
          ) : (
            <p>No posts available.</p>
          )
        )}
      </div> */}
    </div>
  );
};

export default Profile;
