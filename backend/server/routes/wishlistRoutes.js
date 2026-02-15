import express from 'express';
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
  checkWishlistStatus,
} from '../controllers/wishlistController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// All wishlist routes require authentication
router.use(authMiddleware);

router.post('/', addToWishlist);
router.get('/', getUserWishlist);
router.delete('/:productId', removeFromWishlist);
router.get('/status/:productId', checkWishlistStatus);

export default router;
