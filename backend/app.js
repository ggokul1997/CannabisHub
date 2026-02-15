import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './server/config/db.js';
import authRoutes from './server/routes/authRoutes.js';
import productRoutes from './server/routes/productRoutes.js';
import wishlistRoutes from './server/routes/wishlistRoutes.js';
import errorMiddleware from './server/middlewares/errorMiddleware.js';

dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://cannabis-hub-frontend.vercel.app/' // Replace with your Vercel URL
  ],
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes); 
app.use('/api/wishlist', wishlistRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Cannabis Product Discovery Platform API' });
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
