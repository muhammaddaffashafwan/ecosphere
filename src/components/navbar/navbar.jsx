import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataPost } from "../ForumPost/DataPost";
import "./navbar.css";
import axios from "axios";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Misalkan id pengguna yang login adalah 1
  const loggedInUserId = 2;
  const loggedInUser = DataPost.find((user) => user.id === loggedInUserId);

  const navigate = useNavigate();

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


  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set login berdasarkan token
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

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
    } };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src="/images/logo.jpg" alt="Logo" className="w-60" />
        </Link>
      </div>
      <nav className="nav">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-[70px] items-center justify-center">
            <Link to="/inspiration" className="text-lg text-gray-700 hover:text-[#5c7838]">
              INSPIRATION
            </Link>
            <Link to="/property" className="text-lg text-gray-700 hover:text-[#5c7838]">
              PROPERTY
            </Link>
            <Link to="/article1" className="text-lg text-gray-700 hover:text-[#5c7838]">
              ARTICLE
            </Link>

            {isLoggedIn && (
              <Link to="/forum1" className="text-lg text-gray-700 hover:text-[#5c7838]">
                FORUM
              </Link>
            )}

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2] rounded-tl-lg rounded-tr-lg"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      PROFILE
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2] rounded-bl-lg rounded-br-lg"
                      onClick={handleLogout}
                    >
                      LOG OUT
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="mr-[-60px] px-4 py-2 bg-[#5c7838] text-white rounded-full">
                  LOG IN
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-[#c9dbb2] text-gray-700 rounded-full">
                  SIGN UP
                </Link>
              </>
            )}
          </div>

          {/* Mobile and Tablet Menu */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-[#5c7838]">
              MORE
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48">
                <Link
                  to="/inspiration"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2] rounded-tl-lg rounded-tr-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  INSPIRATION
                </Link>
                <Link
                  to="/property"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  PROPERTY
                </Link>
                <Link
                  to="/article1"
                  className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ARTICLE
                </Link>

                {isLoggedIn && (
                  <Link
                    to="/forum1"
                    className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FORUM
                  </Link>
                )}

                {isLoggedIn ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      PROFILE
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2] rounded-bl-lg rounded-br-lg"
                      onClick={handleLogout}
                    >
                      LOG OUT
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      LOG IN
                    </Link>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#c9dbb2]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SIGN UP
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}