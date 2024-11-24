import { useState } from 'react';
import { posts, questions as initialQuestions } from "../../components/ForumPost/DataPost";
import "./forum1.css";

export function Forum1() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [newQuestion, setNewQuestion] = useState('');

  const handleNewQuestionChange = (e) => {
    setNewQuestion(e.target.value);
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
        <div className="w-1/3 ml-5">
          <input
            type="text"
            value={newQuestion}
            onChange={handleNewQuestionChange}
            placeholder="Ask a new question..."
            className="border p-2 rounded w-full mt-4"
          />
          <button
            onClick={addQuestion}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Add Question
          </button>
          <h2 className="text-2xl font-bold mb-4">Questions for You</h2>
          {questions.map((question) => (
            <div key={question.id} className="bg-softCream p-4 rounded-lg mb-4">
              <h3 className="text-xl font-bold mb-2">{question.title}</h3>
              <p className="text-gray-600 mb-2">
                {question.answers} Answers | Last answer {question.lastAnswer}
              </p>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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
