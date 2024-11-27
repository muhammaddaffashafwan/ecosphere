import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
	try {
		const users = await Users.findAll();

		return res.json(users);
	} catch (error) {
		console.log(error);
		// TODO: handle error
	}
};

export const authSignup = async (req, res) => {
	try {
		// Ambil data dari request
		const { name, email, password } = req.body;

		// Validasi input
		if (!name || !email || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		// Cek apakah name sudah terdaftar
		const existingName = await Users.findOne({ where: { name } });
		if (existingName) {
			return res.status(409).json({ error: "Name is already taken" });
		}

		// Cek apakah email sudah terdaftar
		const existingEmail = await Users.findOne({ where: { email } });
		if (existingEmail) {
			return res.status(409).json({ error: "Email is already registered" });
		}

		// Hash password sebelum disimpan
		const hashedPassword = await bcrypt.hash(password, 10);

		// Simpan user ke database
		const newUser = await Users.create({
			name,
			email,
			password: hashedPassword // Simpan password yang sudah di-hash
		});

		return res.status(201).json({
			status: "success",
			message: "User registered successfully",
			data: {
				id: newUser.id,
				name: newUser.name,
				email: newUser.email
			}
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "An error occurred" });
	}
};

export const authLogin = async (req, res) => {
	try {
		// Ambil data dari request
		const { name, password } = req.body;

		// Validate input
		if (!name || !password) {
			return res.status(400).json({ error: "Name and password are required" });
		}

		// Find user by name
		const user = await Users.findOne({ where: { name } });
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// Verify password
		const passwordValid = await bcrypt.compare(password, user.password);
		if (!passwordValid) {
			return res.status(401).json({ error: "Invalid password" });
		}

		// Generate JWT token
		const token = jwt.sign(
			{ id: user.id, name: user.name }, // Payload
			process.env.JWT_SECRET, // Secret key
			{ expiresIn: "24h" } // Token expiration time
		);

		return res.status(200).json({
			status: "success",
			message: "Login successful",
			token: `Bearer ${token}`
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "An error occurred" });
	}
};