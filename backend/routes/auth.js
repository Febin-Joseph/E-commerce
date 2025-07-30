import express from "express";
import { login, profile } from "../controllers/auth.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.post('/login', login);
router.get('/profile', authMiddleware, profile);

export default router;