import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if already in wishlist
    const alreadyInWishlist = await Wishlist.findOne({
      userId,
      productId,
    });

    if (alreadyInWishlist) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist',
      });
    }

    // Add to wishlist
    const wishlistItem = await Wishlist.create({
      userId,
      productId,
    });

    res.status(201).json({
      success: true,
      message: 'Product added to wishlist',
      wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's wishlist
export const getUserWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.find({ userId })
      .populate('productId')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlistItem = await Wishlist.findOneAndDelete({
      userId,
      productId,
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Product not in wishlist',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product removed from wishlist',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Check if product is in user's wishlist
export const checkWishlistStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;

    const wishlistItem = await Wishlist.findOne({
      userId,
      productId,
    });

    res.status(200).json({
      success: true,
      isInWishlist: !!wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
