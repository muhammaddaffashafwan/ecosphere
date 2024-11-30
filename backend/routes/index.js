import express from "express";
import { getUsers, authSignup, authLogin, updateProfileImage, deleteProfileImage, resetPassword } from "../controllers/Users.js";
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
router.post("/forgot-password", resetPassword); // Add the route to handle password reset

export default router;
