import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    category: {
      type: String,
      enum: ['Flower', 'Edibles', 'Oils'],
      required: [true, 'Please select a category'],
    },
    thc: {
      type: Number,
      required: [true, 'Please provide THC percentage'],
      min: 0,
      max: 100,
    },
    cbd: {
      type: Number,
      required: [true, 'Please provide CBD percentage'],
      min: 0,
      max: 100,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    image: {
      type: String,
      default: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect fill='%23f3f4f6' width='100%25' height='100%25'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23222' font-size='20'>Cannabis Product</text></svg>",
    },
    effects: {
      type: [String],
      default: [],
    },
    usageType: {
      type: String,
      enum: ['Smoking', 'Vaping', 'Edible', 'Topical', 'Sublingual'],
    },
    stock: {
      type: Number,
      default: 10,
      min: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
