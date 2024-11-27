import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).json({ error: "Unauthenticated" });
	}

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

	if (!decodedToken.id) {
		return res.status(403).json({ error: "Unauthorized" });
	}

	next();
};