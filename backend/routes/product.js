import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { products } from '../controllers/product.js';

const router = express.Router();

router.get('/products', authMiddleware, products);

export default router;