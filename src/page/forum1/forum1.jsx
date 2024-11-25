import { useState } from 'react';
import { DataPost } from "../../components/ForumPost/DataPost";
import ForumPost from "../../components/ForumPost/ForumPost";

export function Forum1() {
  // State for the list of questions
  const [questions, setQuestions] = useState([
    { id: 1, title: 'What is React?', answers: 14, lastAnswer: '1h ago' },
    { id: 2, title: 'How do I use hooks?', answers: 26, lastAnswer: '1h ago' },
  ]);

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
          <div className="flex items-center bg-softCream p-3 rounded-lg mb-5">
            <img
              src="https://i.pravatar.cc/50?img=5"
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />
            <input
              type="text"
              placeholder="What's Your Question?"
              className="bg-lightGreen rounded-lg p-2 w-full text-gray-700 focus:outline-none"
            />
          </div>

          {/* Questions Section */}
          <h2 className="text-xl font-bold mb-4">QUESTION FOR YOU</h2>
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-softCream p-4 rounded-lg shadow-md mb-4 border border-lightGreen"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {question.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {question.answers} Answers | Last answer {question.lastAnswer}
              </p>
              <button
                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-6 py-2"
              >
                ANSWER
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Forum1;
