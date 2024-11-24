import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "./forum2.css";
import Forum1 from "../forum1/forum1";

export function Forum2() {
  const location = useLocation();
  const post = location.state?.post;  // Access the post data passed from Forum1

  const [loveCount, setLoveCount] = useState(post.likes);  // Use the post data here
  const [isLoveClicked, setIsLoveClicked] = useState(false);
  const [commentCount, setCommentCount] = useState(post.comments);  // Similarly, use comment count from post

  const handleLoveClick = () => {
    setIsLoveClicked(!isLoveClicked);
    setLoveCount(isLoveClicked ? loveCount - 1 : loveCount + 1);
  };

  const handleCommentClick = () => {
    // Handle comment modal logic here
  };

  return (
    <main className="flex-grow mt-20">
      <div className="flex flex-col items-center">
        <div className="ellipse-parent flex items-center gap-4 mt-10">
          <img className="frame-child rounded-full w-16 h-16" alt="Profile Picture" src={post.userAvatar} />
          <div className="muhammad-sumbul-parent flex flex-col">
            <b className="muhammad-sumbul">{post.userName}</b>
            <div className="min-read text-sm">{post.date}</div>
          </div>
        </div>

        <h1 className="starting-my-eco-home text-5xl font-optician mt-5">{post.title}</h1>
        <a href="forum1.html" className="back-link mt-5">
          <img className="back-icon" alt="Back" src="asset/back.png" />
        </a>

        <div className="line-parent flex items-center justify-between w-full mt-5">
          <button className="buttoncontent-wrapper flex items-center border border-gray-300 rounded-full px-4 py-2" onClick={handleLoveClick}>
            <i className={`bi ${isLoveClicked ? 'bi-heart-fill text-red-500' : 'bi-heart'}`}></i>
            <span className="love-count ml-2">{loveCount}</span>
          </button>

          <div id="commentContainer">
            <button className="chat-message-parent flex items-center" onClick={handleCommentClick}>
              <i className="bi bi-chat-text"></i>
              <span className="comment-count ml-2">{commentCount}</span>
            </button>
          </div>
        </div>

        <div className="rectangle-parent flex flex-col items-start mt-5">
          {post.showImage && (
            <img className="rectangle-icon rounded-lg max-w-full h-auto" alt="" src={post.imageUrl} />
          )}
          <div className="hello-ecosphere-community-container mt-5">
            <p className="hello-ecosphere-community text-lg">{post.content}</p>
          </div>
        </div>

        {/* Render comments and replies here */}
      </div>
    </main>
  );
}

export default Forum2;
