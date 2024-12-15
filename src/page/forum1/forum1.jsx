import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // To get the id from the URL
import ForumPost from "../../components/ForumPost/ForumPost";
import "../global.css";
import axios from "axios";

export function Forum1() {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Assuming id is passed as a URL parameter
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "What eco-friendly DIY projects have you tried recently?",
    },
    {
      id: 2,
      title: "What inspires you to make eco-friendly choices in your home?",
    },
    {
      id: 3,
      title: "What is the most impactful change you've made at home to support sustainability?",
    },
    {
      id: 4,
      title: "Which smart tech solutions have helped make your home greener?",
    },
  ]);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayMode, setOverlayMode] = useState("add");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [formTitle, setFormTitle] = useState(""); // Add this state
  const [formCaption, setFormCaption] = useState(""); // Add if not already defined
  const [formHashtags, setFormHashtags] = useState(""); // Add for hashtags if needed
  const [formImageUrl, setFormImageUrl] = useState(""); // Add for image URL if needed


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

  console.log("profileImage", profileImage);

useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: token,
          },
        });
  
        // Use default values if response data is not available
        setName(response.data.name || ""); // Default to empty string
        setUsername(response.data.username || ""); // Default to empty string
        setProfileImage(
          response.data.profile_image
            ? `http://localhost:5000/${response.data.profile_image}`
            : 'https://via.placeholder.com/150'
        ); // Default profile image
        setUserId(response.data.id || null); // Store the user ID
  
        console.log("Profile Image:", response.data.profile_image);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (token) {
      fetchUserProfile();
    }
  }, [token]);
  

  const handleQuestionClick = () => {
    setOverlayMode("add");
    setSelectedQuestion(null);  // No question selected for new question
    setFormTitle("");
    setFormCaption("");
    setFormHashtags("");
    setFormImageUrl(null);
    setOverlayVisible(true); // Show the overlay when button is clicked
  };

  const handleAnswerClick = (question) => {
    setOverlayMode("answer");
    setSelectedQuestion(question); // Set selected question for answering
    setFormCaption("");
    setFormHashtags("");
    setFormImageUrl(null);
    setOverlayVisible(true); // Show the overlay when answering a question
  };

  const handleOverlaySubmit = async () => {
    const formData = new FormData();
    formData.append("caption", formCaption); // Backend expects 'caption'
    if (formTitle && overlayMode === "add") {
      formData.append("title", formTitle); // Add the title only when creating a new question
    }
    if (formHashtags) {
      formData.append("hashtags", formHashtags); // Attach hashtags
    }
    if (formImageUrl) {
      formData.append("image_url", formImageUrl); // Attach image
    }

    try {
      if (overlayMode === "add") {
        // Add new question
        setQuestions([
          ...questions,
          { id: questions.length + 1, title: formTitle, caption: formCaption }, // Add the new question
        ]);
      } else if (overlayMode === "answer" && selectedQuestion) {
        // Add new answer to a selected question
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === selectedQuestion.id
              ? { ...q, replies: (q.replies || 0) + 1, lastAnswer: "Just now" }
              : q
          )
        );
      }
      setOverlayVisible(false); // Hide overlay after submission
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    const formData = {
      title: formTitle, // The title of the forum post
      caption: formCaption, // The caption or content of the forum post
      hashtags: formHashtags, // The hashtags related to the post
      image_url: formImageUrl, // The image URL if the post includes an image
      user_id: localStorage.getItem("id"),
      username: localStorage.getItem("username"),
    };
  
    console.log("username: ", formData.username);
    
    try {
      // Send a POST request to your backend API (adjust the URL as needed)
      const response = await fetch('http://localhost:5000/create-forum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token, // Assuming you're using token-based authentication
        },
        body: JSON.stringify(formData),
      });
  
      // Parse the response
      const data = await response.json();
  
      if (response.ok) {
        // Handle the success case (e.g., show a success message)
        alert("Forum post created successfully");
        console.log(data.forumPost); // The created forum post object
      } else {
        // Handle error response
        alert(`error: ${data.error}`);
      }
    } catch (error) {
      // Handle network or other unexpected errors
      console.error("Error creating forum post:", error);
      alert("An error occurred while creating the post");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormImageUrl(file || " ");
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-5 flex flex-col md:flex-row">
        <div className="mobile:order-2 md:order-1 lg:order-1 flex-1">
          <h1 className="text-left font text-5xl font-bold mb-5 mt-[100px]">
            SHARING & DISCUSSIONS
          </h1>
          <div className="flex flex-col">
            {Array.isArray(post) && post.map((data, i) => (
              <ForumPost key={i} data={data} />
            ))}
          </div>
        </div>

        <div className="mobile:order-1 mobile:w-[324px] mobile:ml-1 mobile:mt-[100px] lg:w-1/3 lg:ml-5 lg:mt-[195px] sm:mt-[245px] sm:w-1/3 sm:ml-5">
          <div
            className="flex items-center bg-softCream p-3 rounded-lg mb-5 cursor-pointer border border-black shadow-md"
            onClick={handleQuestionClick} // Trigger overlay for new question
          >
            <img
              src={profileImage}
              alt="Profile"
              className="w-10 h-10 rounded-full mr-3"
            />
            <input
              type="text"
              placeholder="What's Your Question?"
              className="bg-lightGreen rounded-lg p-2 w-full text-gray-700 focus:outline-none cursor-pointer"
              readOnly
            />
          </div>

          <div className="bg-softCream p-3 rounded-lg">
            <h2 className="font text-xl font-bold mb-4">QUESTION FOR YOU</h2>
            {questions.map((question) => (
              <div
                onClick={() => {
                  setFormTitle(question.title); // Set the title for the answer form
                }}
                key={question.id}
                className="bg-softCream p-4 rounded-lg mb-4 border border-black shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-[15px]">
                  {question.title}
                </h3>
                <button
                  className="bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:ring-[#5f7f33] hover:ring-2 active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all rounded-full px-[17px] py-[7px] text-[15px]"
                  onClick={() => handleAnswerClick(question)} // Open overlay for answering
                >
                  ANSWER
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {overlayVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[550px] mt-[60px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {overlayMode === "add" ? "Ask a New Question" : `${selectedQuestion.title}`}
            </h2>
            {overlayMode === "add" && (
              <input
                type="text"
                placeholder="Enter the title here..."
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            )}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder={
                overlayMode === "add"
                  ? "Write your question details here..."
                  : "Write your answer here..."
              }
              value={formCaption}
              onChange={(e) => setFormCaption(e.target.value)}
            ></textarea>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Hashtags</label>
              <input
                type="text"
                placeholder="#green #sustainability"
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={formHashtags}
                onChange={(e) => setFormHashtags(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white rounded-full px-4 py-2"
                onClick={() => setOverlayVisible(false)} // Close overlay without saving
              >
                Cancel
              </button>
              <button
                className="bg-[#739646] text-white rounded-full px-4 py-2"
                onClick={handleAnswerSubmit} // Handle form submission
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
