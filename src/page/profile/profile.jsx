import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ForumPost from "../../components/ForumPost/ForumPost";
import "../global.css";

const Profile = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const {id} = useParams();

  const localprofileimage= localStorage.getItem("profile_image")
  const localName = localStorage.getItem("name");
  const localUsername = localStorage.getItem("username");
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    localprofileimage
    ? `http://localhost:5000/${localprofileimage}`
    : "https://via.placeholder.com/150");
  const [name, setName] = useState(localName || ""); // Default value is an empty string
  const [username, setUsername] = useState(localUsername || "") // Default value is an empty string
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  console.log('LocalStorage Name:', localName);  // Periksa apakah value di localStorage sudah benar
console.log('LocalStorage Username:', localUsername);

  const token = localStorage.getItem("token");
  if (!token) {
    alert("No token found, please log in again.");
    return;
  }

  // Correcting the fetch call to use token and id
  useEffect(() => {
    if (!token) {
      alert("You need to log in to access this feature.");
      window.location.href = "/login"; // Redirect if not logged in
    }
    setLoading(true);
    fetch(`http://localhost:5000/get-forum`, {
      headers: {
        Authorization: token, // Include token in the request header
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
        console.log("Forum Data:", data); // Log the forum data
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch post data: ${error.message}`);
        setLoading(false);
      });
  }, [id, token]);

  // Fetch user profile data on load
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true); // Tampilkan indikator loading saat data sedang diambil
  
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: token,
          },
        });
  
        console.log('__User data__:', response);
  
        // Validasi jika response.data ada
        if (response.data) {
          setName(response.data.name || name); // Gunakan nilai dari response atau nilai saat ini
          setUsername(response.data.username || username); // Sama seperti di atas
          setProfileImage(
            response.data.profile_image
              ? `http://localhost:5000/${response.data.profile_image}`
              : profileImage // Gunakan nilai saat ini jika data kosong
          );
          setUserId(response.data.id || userId); // Sama seperti di atas
        }
      } catch (error) {
        console.error('__Error fetching user data__', error);
        alert('Error fetching user data, please try again!');
      } finally {
        setLoading(false); // Matikan indikator loading setelah selesai
      }
    };
  
    fetchUserProfile(); // Panggil fungsi untuk mengambil data pengguna
  }, [token]); // Ketergantungan pada token

  // Fetch user posts on load
  useEffect(() => {
    const fetchUserPosts = async () => {
      const userId = localStorage.getItem("id"); // Ambil user_id dari localStorage
      if (!userId) return; // Only fetch posts if the userId is available

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/get-forum/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log('__User posts__:', response);

        setName(response.data.name || ""); // Default to empty string
      setUsername(response.data.username || ""); // Default to empty string
      setUserId(response.data.id || null); // Store the user ID

         // Memastikan posts ada di dalam response
        if (Array.isArray(response.data.replies)) {
          setUserPosts(response.data.replies);
        } else {
          setUserPosts([]); // Default ke array kosong jika tidak ada post
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
        'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });

      console.log(response.data)

      // Update state dengan URL gambar profil baru dari backend
      // setProfileImage(response.data.data.profile_image); // Memperbarui URL gambar
      setProfileImage(`http://localhost:5000/${response.data.data.profile_image}`)
      localStorage.setItem("profile_image", response.data.data.profile_image)
      setName(name);
      setUsername(username);
      localStorage.setItem("name", name);
      localStorage.setItem("username", username);
      handleCloseModal(); // Tutup modal setelah menyimpan perubahan
    } catch (error) {
      console.error("Error updating profile:",error.response || error);
      alert(
        error.response?.data?.message ||
        "Error updating profile, please try again!"
      );
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
        <div className=" absolute top-[355px] left-[55px] flex items-center">
          <img className="mobile:ml-[-30px] mobile:w-20 mobile:h-20 md:w-24 md:h-24 rounded-full border-4 border-[#404d3c]" src={profileImage} alt="User Avatar" />
          <div className="mobile:pt-[20px] md:pt-[10px]  ml-4 text-white">
            <h1 className="mobile:text-[15px] md:font md:text-2xl font-bold">{name}</h1>
            <p className="mobile:text-[13px] md:text-xl text-sm text-black">{username}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={handleEditClick}
          className="mobile:px-[13px] mobile:text-[13px] mobile:ml-[330px] mobile:pb-[3px] md:absolute md:top-[410px] md:right-[55px] md:px-[40px] md:text-[17px] md:py-2 rounded-full shadow-md bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:ring-[#5f7f33] hover:ring-2 active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all"
        >
          Edit Profile
        </button>
      </div>

      <div className="flex flex-col mobile:px-[60px] mobile:pt-[80px] md:px-[100px] md:pt-[100px] lg:px-[250px] pt-[180px]">
  {Array.isArray(post) &&
    post
      .filter((data) => data.user_id === parseInt(localStorage.getItem("id"))) // Filter berdasarkan user_id
      .map((data, i) => <ForumPost key={i} data={data} />)}
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

      
     
    </div>
  );
};

export default Profile;
