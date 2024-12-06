import express from "express";
import { 
  getUsers, 
  authSignup, 
  authLogin, 
  updateProfileImage, 
  deleteProfileImage, 
  resetPassword 
} from "../controllers/Users.js";
import { 
  createForum, 
  getForum, 
  getForumById, // Corrected import
  updateForum, 
  deleteForum, 
  likeForum, 
  unlikeForum, 
  replyToForum, 
  deleteReply 
} from "../controllers/Forum.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Konfigurasi untuk multer (untuk meng-handle upload gambar)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/'); // Folder tempat menyimpan gambar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file yang unik
  },
});
const upload = multer({ storage }); // Inisialisasi multer dengan konfigurasi penyimpanan

// Tes Web: Untuk memastikan server berjalan
router.get("/", (req, res) => {
  res.json({ status: "success" });
});

// Rute untuk Signup
router.post("/signup", authSignup);

// Rute untuk Login
router.post("/login", authLogin);

// Rute untuk mendapatkan data pengguna (memerlukan otentikasi)
router.get("/users", authMiddleware, getUsers);

// Rute untuk mengupdate gambar profil (memerlukan otentikasi)
router.put("/profile-image", authMiddleware, upload.single('profile_image'), updateProfileImage);

// Rute untuk menghapus gambar profil (memerlukan otentikasi)
router.delete("/profile-image", authMiddleware, deleteProfileImage);

// Rute untuk reset password (tanpa otentikasi, hanya memerlukan email)
router.post("/forgot-password", resetPassword);

// Forum CRUD Routes


// Create a new forum post (requires authentication)
router.post("/create-forum", authMiddleware, createForum);

// Get all forum posts
router.get("/get-forum", getForum);

// Get a single forum post by ID (optional, using getForumById)
router.get("/get-forum/:id", getForumById); // Use getForumById for specific post

// Update a forum post (requires authentication)
router.put("/update-forum/:id", authMiddleware, updateForum);

// Delete a forum post (requires authentication)
router.delete("/delete-forum/:id", authMiddleware, deleteForum);

// Like a forum post (requires authentication)
router.post("/like-forum/:id/like", authMiddleware, likeForum);

// Unlike a forum post (requires authentication)
router.delete("/like-forum/:id/like", authMiddleware, unlikeForum);

// Reply to a forum post (requires authentication)
router.post("/reply-forum/:id/reply", authMiddleware, replyToForum);

// Delete a reply to a forum post (requires authentication)
router.delete("/reply-forum/:id/reply/:replyId", authMiddleware, deleteReply);

export default router;
