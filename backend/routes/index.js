import express from "express";
import { getUsers } from "../controllers/Users.js";

console.log("getUsers imported successfully:", getUsers);
const router = express.Router();

// tes web uda jalan
router.get('/', (req, res) => {
  res.json({status: "success"});
});

router.get('/users', getUsers);

export default router;
