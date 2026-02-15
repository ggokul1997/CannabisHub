import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Protected routes (admin only)
router.post('/', authMiddleware, roleMiddleware('admin'), createProduct);
router.put('/:id', authMiddleware, roleMiddleware('admin'), updateProduct);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteProduct);

export default router;
