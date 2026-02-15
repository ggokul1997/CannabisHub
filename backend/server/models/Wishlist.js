import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
  },
  { timestamps: true }
);

// Ensure a product can only be wishlisted once per user
wishlistSchema.index({ userId: 1, productId: 1 }, { unique: true });

export default mongoose.model('Wishlist', wishlistSchema);
