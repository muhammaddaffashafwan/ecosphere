import { useState } from 'react';
import ForumPost from "../../components/ForumPost/ForumPost";
import "./forum1.css";

export function Forum1() {
  // State untuk menyimpan daftar postingan
  const [posts] = useState([
    {
      link: '#',
      userAvatar: 'asset/forum1/profile1.png',
      userName: 'Ester Howard',
      date: 'Aug 24, 2024 | 09.15 pm',
      title: 'Looking for Simple Tips to Start My Eco-Friendly Journey!',
      content: "Hi everyone! 👋 I'm new to the eco-friendly lifestyle and looking to start with small, impactful changes at home...",
      tags: '#EcoFriendlyLiving #GreenHome #TipsForBeginners',
      likes: 24,
      comments: 4 
    },
    {
      link: 'forum2.html',
      userAvatar: 'asset/forum1/muhammad sumbul.png',
      userName: 'Muhammad Sumbul',
      date: 'Aug 04, 2024 | 07.15 pm',
      title: 'Starting My Eco-Home Journey: What’s the First Step?',
      content: "Hello, Ecosphere community! 🌿 I've recently become passionate about making my home more eco-friendly, but I’m overwhelmed by all the advice out there...",
      tags: '#EcoFriendlyHome #SustainabilityTips #BudgetLiving',
      likes: 12,
      comments: 0
    },
    // Tambahkan lebih banyak postingan sesuai kebutuhan
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: 'What eco-friendly DIY projects have you tried recently?',
      answers: 14,
      lastAnswer: '1h',
    },
    {
      id: 2,
      title: 'What inspires you to make eco-friendly choices in your home?',
      answers: 26,
      lastAnswer: '1h',
    },
  ]);

  const [newQuestion, setNewQuestion] = useState('');

  const handleNewQuestionChange = (e) => {
    setNewQuestion(e. target.value);
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== '') {
      const newQuestionObj = {
        id: questions.length + 1,
        title: newQuestion,
        answers: 0,
        lastAnswer: 'Just now',
      };
      setQuestions([...questions, newQuestionObj]);
      setNewQuestion('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-5 flex">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-5">Forum Discussions</h1>
          <div className="flex flex-col gap-5">
            {posts.map((post, index) => (
              <ForumPost key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="w-1/3 ml-5"><input
            type="text"
            value={newQuestion}
            onChange={handleNewQuestionChange}
            placeholder="Ask a new question..."
            className="border p-2 rounded w-full mt-4"
          />
          <button onClick={addQuestion} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
            Add Question
          </button>
          <h2 className="text-2xl font-bold mb-4">Questions for You</h2>
          {questions.map((question) => (
            <div key={question.id} className="bg-white p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold mb-2">{question.title}</h3>
              <p className="text-gray-600 mb-2">
                {question.answers} Answers | Last answer {question.lastAnswer}
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Answer
              </button>
            </div>
          ))}
          
        </div>
      </main>
    </div>
  );
}

export default Forum1;