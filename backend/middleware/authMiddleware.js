import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  // Mengambil token dari header Authorization
  const token = req.header("authorization")?.split(" ")[1];

  // Jika token tidak ditemukan, kembalikan respons Unauthorized
  if (!token) {
    return res.status(401).json({ error: "Unauthenticated, token missing" });
  }

  // Pastikan JWT_SECRET ada di environment variable
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: "Server error: JWT_SECRET is missing" });
  }

  try {
    // Memverifikasi token dengan menggunakan JWT_SECRET
    const decodedToken = jwt.verify(token, secret);

    // Pastikan id ada di dalam token, jika tidak ada maka kembalikan respons Unauthorized
    if (!decodedToken || !decodedToken.id) {
      return res.status(403).json({ error: "Unauthorized, invalid token" });
    }

    // Menyimpan data user yang telah terdekode di req.user untuk digunakan di route berikutnya
    req.user = decodedToken;

    // Lanjutkan ke route handler berikutnya
    next();
  } catch (err) {
    // Menangani error jika token tidak valid atau kedaluwarsa
    console.error("Authentication error:", err); // Mencetak error ke console untuk debugging

    // Periksa apakah error yang terjadi adalah token kadaluarsa atau token tidak valid
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: "Token expired" });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // Jika ada error lain, beri respons umum
    return res.status(500).json({ error: "Server error during token verification" });
  }
};
