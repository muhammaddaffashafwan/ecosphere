import express from "express";
import { 
  getUsers, 
  authSignup, 
  authLogin, 
  updateProfileImage, 
  resetPassword 
} from "../controllers/Users.js";
import { 
  createForum, 
  getForum, 
  getForumById, 
  updateForum, 
  deleteForum, 
  likeForum, 
  unlikeForum, 
  replyToForum, 
  deleteReply,
  getRepliesByForumId
} from "../controllers/Forum.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { upload, checkImageUrl } from "../middleware/checkImageUrl.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// Konfigurasi untuk multer (untuk meng-handle upload gambar profil)
const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/'); // Folder tempat menyimpan gambar profil
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file yang unik
  },
}); 
const uploadProfile = multer({ storage: profileStorage }); // Inisialisasi multer untuk profil

// Konfigurasi untuk multer (untuk meng-handle upload gambar untuk forum)
const forumStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/forum_images/'); // Folder tempat menyimpan gambar forum
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file yang unik
  },
});
const uploadForumImage = multer({ storage: forumStorage }); // Inisialisasi multer untuk gambar forum

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
router.put("/profile-image", authMiddleware, uploadProfile.single('profile_image'), updateProfileImage);

// Rute untuk reset password (tanpa otentikasi, hanya memerlukan email)
router.post("/forgot-password", resetPassword);

// Forum CRUD Routes
router.post("/create-forum", authMiddleware, uploadForumImage.single('image_url'), checkImageUrl, createForum); // Using multer for image_url

router.get("/get-forum", getForum);

router.get("/get-forum/:id", getForumById); // Use getForumById for specific post

router.put("/update-forum/:id", authMiddleware, updateForum);

router.delete("/delete-forum/:id", authMiddleware, deleteForum);

router.post("/like-forum/:id/like", authMiddleware, likeForum);

router.delete("/like-forum/:id/like", authMiddleware, unlikeForum);

router.post("/reply-forum/:id/reply", authMiddleware, replyToForum);

router.delete("/reply-forum/:id/reply/:replyId", authMiddleware, deleteReply);

router.get("/reply-forum/:id", authMiddleware, getRepliesByForumId)

export default router;
