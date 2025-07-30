import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"

import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js"
import cartRoutes from "./routes/cart.js"

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use('/api', authRoutes)
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

app.listen(5000, () => console.log("server started"))