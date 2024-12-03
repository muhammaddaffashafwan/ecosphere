import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

export const resetPassword = async (req, res) => {
  const { email, password } = req.body; // Mengambil email, password, dan confirm password dari body request

  try {
    // Basic validation to check if email, password, and confirmPassword are provided
    if (!email || !password ) {
      return res.status(400).json({ error: "Email, password, and confirm password are required." });
    }

    // Cek apakah email yang dimasukkan ada dalam database
    const user = await Users.findOne({ where: { email } });  // Ensure you're querying with the correct model and method
    if (!user) {
      return res.status(404).json({ error: "User not found with this email." });
    }

    // Hash password baru yang dimasukkan
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password pengguna dalam database
    user.password = hashedPassword;
    await user.save();

    // Response sukses setelah password berhasil diubah
    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error in password reset:", error.message); // Log the error message for debugging
    res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
};

// Konfigurasi penyimpanan file menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profiles/'); // Direktori untuk menyimpan gambar
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file dengan timestamp
  },
});

// Filter untuk validasi tipe file
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'), false);
    }
  },
});

// **GET Users**
export const getUsers = async (req, res) => {
  try {
    // Fetch all users, you can add specific attributes or filtering if needed
    const users = await Users.findAll({
      attributes: ['id', 'name', 'username', 'email', 'profile_image', 'createdAt', 'updatedAt'], // Specify the fields you want to return
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message); // Log detailed error
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
      { id: user.id, username: user.username }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "24h" } // Token expiration time
    );

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

// **Update Profile Image**
export const updateProfileImage = async (req, res) => {
  // Memastikan file diupload
  upload.single('profile_image')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message }); // Error handling jika file tidak valid
    }

    try {
      const userId = req.user.id; // Asumsikan userId tersedia dari JWT token
      const imagePath = '/uploads/profiles/' + req.file.filename; // Path gambar

      const user = await Users.findOne({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await user.update({ profile_image: imagePath });

      return res.status(200).json({
        status: "success",
        message: "Profile image updated successfully",
        data: {
          profile_image: imagePath,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "An error occurred while updating profile image" });
    }
  });
};

// **Delete Profile Image**
export const deleteProfileImage = async (req, res) => {
  try {
    const userId = req.user.id; // Asumsikan userId tersedia dari JWT token

    const user = await Users.findOne({ where: { id: userId } });
    if (!user || !user.profile_image) {
      return res.status(404).json({ error: "Profile image not found" });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const imagePath = path.join(__dirname, '..', user.profile_image); // Pastikan path benar

    fs.unlink(imagePath, async (err) => {
      if (err) {
        return res.status(500).json({ error: "Error deleting profile image from server" });
      }

      await user.update({ profile_image: null });

      return res.status(200).json({
        status: "success",
        message: "Profile image deleted successfully",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred while deleting profile image" });
  }
};
