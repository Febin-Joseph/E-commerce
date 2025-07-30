import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { addToCart } from '../controllers/cart.js';

const router = express.Router();

router.post('/cart', authMiddleware, addToCart);

export default router;