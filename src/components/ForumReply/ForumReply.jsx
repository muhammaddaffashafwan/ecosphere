import { useState, useEffect, useRef } from "react";
import axios from "axios";

function ForumReply({ forumId }) {
  const [comments, setLocalComments] = useState([]); // Local comments state
  const [replyingToCommentId, setReplyingToCommentId] = useState(null); // ID komentar yang sedang dibalas
  const [replyText, setReplyText] = useState(""); // Teks balasan yang ditulis pengguna
  const replyAreaRef = useRef(null); // Referensi untuk area reply

  // Fetch replies based on forumId
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/reply-forum/${forumId}`);
        setLocalComments(response.data); // Set replies data to state
      } catch (error) {
        console.error("Error fetching replies", error);
      }
    };

    if (forumId) {
      fetchReplies();
    }
  }, [forumId]); // Trigger when forumId changes

  // Fungsi untuk mengirimkan balasan
  const submitReply = async (commentId) => {
    if (replyText.trim()) {
      try {
        const response = await axios.post("http://localhost:5000/reply-forum", {
          forum_id: forumId,
          reply_text: replyText,
        });

        // If successful, update the local state to include the new reply
        const newReply = response.data.reply;
        setLocalComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      ...newReply,
                      comment: replyText, // Add the reply text
                    },
                  ],
                }
              : comment
          )
        );

        setReplyingToCommentId(null); // Reset ID komentar yang sedang dibalas
        setReplyText(""); // Reset teks balasan
      } catch (error) {
        console.error("Error submitting reply", error);
      }
    }
  };

  // Menangani klik di luar area balasan
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (replyAreaRef.current && !replyAreaRef.current.contains(event.target)) {
        setReplyingToCommentId(null); // Menutup balasan jika klik di luar area
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Menambahkan event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Membersihkan event listener saat komponen unmount
    };
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} className="border-b pb-4 mb-4">
          {/* Komentar Utama */}
          <div className="flex items-start">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={comment.avatar}
              alt={comment.userName}
            />
            <div>
              <div className="flex items-center">
                <span className="font-semibold">{comment.userName}</span>
                <span className="text-sm text-gray-500 ml-2">{comment.date}</span>
              </div>
              <p className="mt-2 text-gray-700">{comment.comment}</p>
            </div>
          </div>

          {/* Tombol Reply */}
          <button
            className="text-black-500 mt-2 ml-[53px] hover:text-green-500 focus:outline-none transition duration-300"
            onClick={() => setReplyingToCommentId(comment.id)}
          >
            Reply
          </button>

          {/* Textarea untuk Membalas */}
          {replyingToCommentId === comment.id && (
            <div ref={replyAreaRef} className="mt-3 ml-[53px]">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Write your reply..."
              />
              <button
                onClick={() => submitReply(comment.id)}
                className="px-4 py-2 bg-[#739646] text-white rounded-full hover:bg-[#6d9b5d]"
              >
                Submit
              </button>
            </div>
          )}

          {/* Daftar Balasan */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-[53px] mt-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="border-t pt-2 flex items-start">
                  <img
                    className="w-8 h-8 rounded-full mr-3"
                    src={reply.avatar || "/images/forum1/muhammad sumbul.png"} // Avatar balasan
                    alt={reply.userName}
                  />
                  <div>
                    <div className="flex items-start">
                      <span className="font-semibold">{reply.userName}</span>
                      <span className="text-sm text-gray-500 ml-2">{reply.date}</span>
                    </div>
                    <p className="mt-1 text-gray-700">{reply.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ForumReply;
