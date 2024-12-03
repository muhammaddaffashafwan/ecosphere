import { useState, useRef, useEffect } from "react";

function ForumReply({ comments, setComments }) {
  const [replyingToCommentId, setReplyingToCommentId] = useState(null); // ID komentar yang sedang dibalas
  const [replyText, setReplyText] = useState(""); // Teks balasan yang ditulis pengguna
  const replyAreaRef = useRef(null); // Referensi untuk area reply

  // Fungsi untuk memulai membalas komentar
  const handleReply = (commentId) => {
    setReplyingToCommentId(commentId); // Set ID komentar yang sedang dibalas
    setReplyText(""); // Reset teks balasan
  };

  // Fungsi untuk mengirimkan balasan
  const submitReply = (commentId) => {
    if (replyText.trim()) {
      // Perbarui state komentar
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          // Tambahkan balasan ke komentar ini
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(), // ID unik untuk balasan baru
                userName: "Muhammad Sumbul", // Nama pengguna saat ini
                avatar: "/images/forum1/muhammad sumbul.png", // Avatar untuk balasan
                comment: replyText,
                date: "Just now", // Waktu balasan
              },
            ],
          };
        }
        return comment;
      });

      setComments(updatedComments); // Update komentar di state
      setReplyingToCommentId(null); // Reset ID komentar yang sedang dibalas
      setReplyText(""); // Reset teks balasan
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
        <div key={comment.id} className='border-b pb-4 mb-4'>
          {/* Komentar Utama */}
          <div className='flex items-start'>
            <img
              className='w-10 h-10 rounded-full mr-4'
              src={comment.avatar}
              alt={comment.userName}
            />
            <div>
              <div className='flex items-center'>
                <span className='font-semibold'>{comment.userName}</span>
                <span className='text-sm text-gray-500 ml-2'>{comment.date}</span>
              </div>
              <p className='mt-2 text-gray-700'>{comment.comment}</p>
            </div>
          </div>

          {/* Tombol Reply */}
          <button
            className='text-black-500 mt-2 ml-[53px] hover:text-green-500 focus:outline-none transition duration-300'
            onClick={() => handleReply(comment.id)}
          >
            Reply
          </button>

          {/* Textarea untuk Membalas */}
          {replyingToCommentId === comment.id && (
            <div ref={replyAreaRef} className='mt-3 ml-[53px]'>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className='w-full p-2 border rounded-md'
                placeholder='Write your reply...'
              />
              <button
                onClick={() => submitReply(comment.id)}
                className='px-4 py-2 bg-[#739646] text-white rounded-full hover:bg-[#6d9b5d]'
              >
                Submit
              </button>
            </div>
          )}

          {/* Daftar Balasan */}
          {comment.replies && comment.replies.length > 0 && (
            <div className='ml-[53px] mt-4'>
              {comment.replies.map((reply) => (
                <div key={reply.id} className='border-t pt-2 flex items-start'>
                  <img
                    className='w-8 h-8 rounded-full mr-3'
                    src={reply.avatar || "/images/forum1/muhammad sumbul.png"} // Avatar balasan
                    alt={reply.userName}
                  />
                  <div>
                    <div className='flex items-start'>
                      <span className='font-semibold'>{reply.userName}</span>
                      <span className='text-sm text-gray-500 ml-2'>{reply.date}</span>
                    </div>
                    <p className='mt-1 text-gray-700'>{reply.comment}</p>
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
