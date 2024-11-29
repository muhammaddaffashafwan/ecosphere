import path from "path";
import fs from "fs";

export const checkProfileImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "Profile image is required" });  // Memastikan ada file yang diupload
  }

  const file = req.file;
  const allowedExtensions = [".jpg", ".jpeg", ".png"];  // Format file yang diperbolehkan
  const fileExtension = path.extname(file.originalname).toLowerCase();  // Mendapatkan ekstensi file

  // Cek apakah file memiliki ekstensi yang valid
  if (!allowedExtensions.includes(fileExtension)) {
    fs.unlinkSync(file.path);  // Hapus file yang tidak valid
    return res.status(400).json({ error: "Invalid file format. Only jpg, jpeg, and png are allowed." });
  }

  next();  // Jika file valid, lanjutkan ke route handler berikutnya
};
