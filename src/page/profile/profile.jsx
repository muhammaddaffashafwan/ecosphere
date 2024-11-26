import { useState } from "react";
import ForumPost from "../../components/ForumPost/ForumPost";
import { DataPost } from "../../components/ForumPost/DataPost";

const Profile = () => {
  // Memfilter data untuk hanya menampilkan postingan Muhammad Sumbul
  const userPosts = DataPost.filter((post) => post.userName === "Muhammad Sumbul");

  // State untuk modal edit profil
  const [isEditOpen, setIsEditOpen] = useState(false);

  // State untuk foto profil
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );

  // State untuk file gambar baru
  const [newProfileImage, setNewProfileImage] = useState(null);

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditOpen(false);
    setNewProfileImage(null); // Reset gambar sementara
  };

  const handleSaveProfile = () => {
    if (newProfileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Menyimpan gambar yang telah dipilih
      };
      reader.readAsDataURL(newProfileImage); // Membaca gambar sebagai URL
    }
    handleCloseModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfileImage(file); // Simpan file gambar
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header Section */}
      <div className="relative flex-shrink-0">
        {/* Background Image */}
        <div className="h-[400px] bg-gradient-to-t from-[#6d9b5d] to-white"></div>

        {/* Profile Avatar and Details */}
        <div className="absolute top-[355px] left-[55px] flex items-center">
          <img
            className="w-24 h-24 rounded-full border-4 border-[#6d9b5d]"
            src={profileImage} alt="User Avatar"
          />
          <div className="ml-4 text-white">
            <h1 className="text-2xl font-bold font-opticians">Muhammad Sumbul</h1>
            <p className="text-sm text-black">@sumbul</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button
          onClick={handleEditClick}
          className="absolute top-[410px] right-[55px] px-[40px] py-2 rounded-full shadow-md bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:border-[#5f7f33] active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all"
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
                  defaultValue="Muhammad Sumbul"
                />
              </div>

              {/* Edit Bio */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-2"
                  placeholder="Enter your bio"
                ></textarea>
              </div>

              {/* Change Profile Picture */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Change Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 rounded-full mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-[#739646] text-white rounded-full hover:bg-[#6d9b5d]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* User Posts Section */}
      <div className="mt-32 p-5">
        <h2 className="text-xl font-bold mb-4">Muhammad Sumbul's Posts</h2>
        {userPosts.length > 0 ? (
          userPosts.map((post) => <ForumPost key={post.id} post={post} />)
        ) : (
          <p className="text-lg text-gray-500">No posts available for Muhammad Sumbul.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
