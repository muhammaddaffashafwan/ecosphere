import express from "express";
import { getUsers } from "../controllers/Users.js";

console.log("getUsers imported successfully:", getUsers);
const router = express.Router();

router.get('/users', getUsers);

export default router;
