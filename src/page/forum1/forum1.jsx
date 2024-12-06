import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get the id from the URL
import ForumPost from "../../components/ForumPost/ForumPost";
import "../global.css";

export function Forum1() {
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
  const [inputTitle, setInputTitle] = useState("");
  const [bodyContent, setBodyContent] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false); // Add the loading state
  const [post, setPost] = useState(null); // Store the fetched post data
  const [error, setError] = useState(null); // Store the error if there's an issue with fetching data

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("user:", user);
    console.log("token:", token);
  }, [token]);

  const handleQuestionClick = () => {
    setOverlayMode("add");
    setSelectedQuestion(null);
    setInputTitle("");
    setBodyContent("");
    setNewImage(null);
    setOverlayVisible(true);
  };

  const handleAnswerClick = (question) => {
    setOverlayMode("answer");
    setSelectedQuestion(question);
    setBodyContent("");
    setNewImage(null);
    setOverlayVisible(true);
  };

  const handleOverlaySubmit = async () => {
    const formData = new FormData();
    formData.append("caption", bodyContent); // Backend expects 'caption'
    if (inputTitle && overlayMode === "add") {
      formData.append("title", inputTitle); // Add the title only when creating a new question
    }
    if (newImage) {
      formData.append("image_url", newImage); // Attach image
    }

    try {
      if (overlayMode === "add") {
        // Add new question
        setQuestions([
          ...questions,
          { id: questions.length + 1, title: inputTitle, caption: bodyContent }, // Add the new question
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
      setOverlayVisible(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  // Correcting the fetch call to use token and id
  useEffect(() => {
    if (!token) {
      console.error("Token is missing.");
      return;
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
  }, [id, token]); // Now id is being passed from URL and token is managed properly

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-5 flex">
        <div className="flex-1">
          <h1 className="text-left font text-5xl font-bold mb-5 mt-[100px]">
            SHARING & DISCUSSIONS
          </h1>
          <div className="flex flex-col">
            {Array.isArray(post) && post.map((data, i) => (
              <ForumPost key={i} data={data} />
            ))}
          </div>
        </div>

        <div className="w-1/3 ml-5 pt-[195px]">
          <div
            className="flex items-center bg-softCream p-3 rounded-lg mb-5 cursor-pointer border border-black shadow-md"
            onClick={handleQuestionClick}
          >
            <img
              src="/images/forum1/muhammad sumbul.png"
              alt="User Avatar"
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
            <h2 className="font text-xl font-bold mb-4">QUESTION FOR YOU</h2> {/* Static section title */}
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-softCream p-4 rounded-lg mb-4 border border-black shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-[15px]">
                  {question.title} {/* Dynamic question title */}
                </h3>
                <button
                  className="bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:ring-[#5f7f33] hover:ring-2 active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all rounded-full px-[17px] py-[7px] text-[15px]"
                  onClick={() => handleAnswerClick(question)}
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
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
              />
            )}
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder={
                overlayMode === "add"
                  ? "Write your question details here..."
                  : "Write your answer here..."
              }
              value={bodyContent}
              onChange={(e) => setBodyContent(e.target.value)}
            ></textarea>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg p-2"
              />
              {newImage && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(newImage)}
                    alt="Uploaded Preview"
                    className="max-w-[200px] rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                className="bg-gray-200 px-4 py-2 rounded-lg mr-2"
                onClick={() => setOverlayVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleOverlaySubmit}
              >
                {overlayMode === "add" ? "Post Question" : "Post Answer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default Forum1;
