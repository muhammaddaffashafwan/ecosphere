import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Mendapatkan direktori saat ini
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pastikan direktori upload ada
const uploadDirectory = path.join(__dirname, '..', 'uploads', 'profiles');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'));
    }
  },
}).single('profile_image'); // pastikan 'profile_image' adalah key yang digunakan untuk upload file

// **Reset Password**
export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error in password reset:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

// **Update Profile Image**
export const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = req.user.id; // ID user dari token JWT
    const imagePath = '/uploads/profiles/' + req.file.filename; // Path gambar yang diunggah

    // Cari user berdasarkan ID
    const user = await Users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update gambar profil di database
    await user.update({ profile_image: imagePath });

    // Kirim respons dengan URL gambar yang baru
    return res.status(200).json({
      status: "success",
      message: "Profile image updated successfully",
      data: {
        profile_image: imagePath, // Kirim URL gambar yang baru
      },
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    return res.status(500).json({ error: "An error occurred while updating profile image" });
  }
};

// **GET Users**
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'name', 'username', 'email', 'profile_image', 'createdAt', 'updatedAt'],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ error: "Failed to fetch users. Please try again later." });
  }
};

// **Signup**
export const authSignup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    const existingUsername = await Users.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ error: "Username is already taken" });
    }

    const existingEmail = await Users.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ error: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

// **Login**
export const authLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const user = await Users.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token: `Bearer ${token}`,
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};
