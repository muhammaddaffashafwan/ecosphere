import { useState } from "react";
import { DataPost } from "../../components/ForumPost/DataPost";
import ForumPost from "../../components/ForumPost/ForumPost";

export function Forum1() {
  // State for the list of questions
  const [questions, setQuestions] = useState([
    { id: 1, title: "What eco-friendly DIY projects have you tried recently?", answers: 14, lastAnswer: '1h ago', image: null },
    { id: 2, title: "What inspires you to make eco-friendly choices in your home?", answers: 26, lastAnswer: '1h ago', image: null },
    { id: 2, title: "What is the most impactful change you've made at home to support sustainability?", answers: 31, lastAnswer: '3h ago', image: null },
    { id: 2, title: "Which smart tech solutions have helped make your home greener?", answers: 19, lastAnswer: '5h ago', image: null },
  ]);

  // State for overlay
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayMode, setOverlayMode] = useState('add'); // 'add' or 'answer'
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Question for the overlay
  const [inputTitle, setInputTitle] = useState(''); // For adding question title
  const [bodyContent, setBodyContent] = useState(''); // User's input for details
  const [newImage, setNewImage] = useState(null); // State for uploaded image

  // Handle "What's Your Question?" click
  const handleQuestionClick = () => {
    setOverlayMode('add');
    setSelectedQuestion(null);
    setInputTitle('');
    setBodyContent('');
    setNewImage(null); // Reset image state
    setOverlayVisible(true);
  };

  // Handle "ANSWER" button click
  const handleAnswerClick = (question) => {
    setOverlayMode('answer');
    setSelectedQuestion(question);
    setBodyContent('');
    setNewImage(null); // Reset image state
    setOverlayVisible(true);
  };

  // Handle overlay submit
  const handleOverlaySubmit = () => {
    if (overlayMode === 'add') {
      // Add a new question
      if (inputTitle.trim() && bodyContent.trim()) {
        setQuestions([
          ...questions,
          {
            id: questions.length + 1,
            title: inputTitle,
            answers: 0,
            lastAnswer: "Just now",
            image: newImage, // Add image if uploaded
          },
        ]);
      }
    } else if (overlayMode === 'answer') {
      // Simulate adding an answer (increment answers count)
      if (bodyContent.trim()) {
        setQuestions(
          questions.map((q) =>
            q.id === selectedQuestion.id
              ? {
                  ...q,
                  answers: q.answers + 1,
                  lastAnswer: 'Just now',
                  image: newImage, // Add image if uploaded
                }
              : q
          )
        );
      }
    }
    setOverlayVisible(false);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result); // Save image as a base64 string
      };
      reader.readAsDataURL(file); // Read the file as base64 string
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-5 flex">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-5 mt-[100px]">SHARING & DISCUSSIONS</h1>
          <div className="flex flex-col">
            {DataPost.map((post) => (
              <ForumPost key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Right Content */}
        <div className="w-1/3 ml-5 pt-[180px]">
          {/* Input Section */}
          <div
            className="flex items-center bg-softCream p-3 rounded-lg mb-5 cursor-pointer border border-black shadow-md"
            onClick={handleQuestionClick}
          >
            <img
              src="https://i.pravatar.cc/50?img=5"
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

          {/* Questions Section */}
          <div className="bg-softCream p-3 rounded-lg">
          <h2 className="text-xl font-bold mb-4">QUESTION FOR YOU</h2>
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-softCream p-4 rounded-lg mb-4 border border-black shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {question.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {question.answers} Answers | Last answer {question.lastAnswer}
              </p>
              <button
                className="bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:ring-[#5f7f33] hover:ring-2 active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all rounded-full px-6 py-2 text-[15px]"
                onClick={() => handleAnswerClick(question)}
              >
                ANSWER
              </button>
            </div>
          ))}
          </div>
        </div>
      </main>

      {/* Overlay */}
      {overlayVisible && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] max-h-[550px] mt-[60px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">
        {overlayMode === 'add' ? "Ask a New Question" : `${selectedQuestion.title}`}
      </h2>
      {overlayMode === 'add' && (
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
          overlayMode === 'add'
            ? "Write your question details here..."
            : "Write your answer here..."
        }
        value={bodyContent}
        onChange={(e) => setBodyContent(e.target.value)}
      ></textarea>

      {/* Image Upload */}
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
              src={newImage}
              alt="Uploaded Preview"
              className="max-w-[200px] rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          className="bg-gray-200 px-4 py-2 rounded-full mr-2"
          onClick={() => setOverlayVisible(false)}
        >
          Cancel
        </button>
        <button
          className="bg-[#739646] border-[#5f7f33] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#739646] hover:ring-[#5f7f33] hover:ring-2 active:bg-[#ffffff] active:text-[#739646] active:ring-2 transition-all px-4 py-2 rounded-full"
          onClick={handleOverlaySubmit}
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

export default Forum1;
