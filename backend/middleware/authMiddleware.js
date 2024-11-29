import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Mengambil token dari header Authorization
  const token = req.headers.authorization?.split(" ")[1];

  // Jika token tidak ditemukan, kembalikan respons Unauthorized
  if (!token) {
    return res.status(401).json({ error: "Unauthenticated" });
  }

  try {
    // Memverifikasi token dengan menggunakan JWT_SECRET yang ada di environment variable
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Pastikan id ada di dalam token, jika tidak ada maka kembalikan respons Unauthorized
    if (!decodedToken.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // Menyimpan data user yang telah terdekode di req.user untuk digunakan di route berikutnya
    req.user = decodedToken;

    // Lanjutkan ke route handler berikutnya
    next();
  } catch (err) {  // Perbaikan di sini
    // Menangani error jika token tidak valid atau kedaluwarsa
    console.error(err); // Mencetak error ke console untuk debugging
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
