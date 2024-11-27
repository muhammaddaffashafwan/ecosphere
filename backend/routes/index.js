import express from "express";
import { getUsers, authSignup, authLogin } from "../controllers/Users.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// tes web uda jalan
router.get("/", (req, res) => {
	res.json({ status: "success" });
});

router.post("/signup", authSignup);
router.post("/login", authLogin);

router.get("/users", authMiddleware, getUsers);

export default router;