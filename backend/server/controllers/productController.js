import Product from '../models/Product.js';

// Get all products with filtering and search
export const getAllProducts = async (req, res) => {
  try {
    const { category, minTHC, maxTHC, search } = req.query;

    // Build filter object
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (minTHC || maxTHC) {
      filter.thc = {};
      if (minTHC) filter.thc.$gte = parseFloat(minTHC);
      if (maxTHC) filter.thc.$lte = parseFloat(maxTHC);
    }

    if (search) {
      filter.name = { $regex: search.trim(), $options: 'i' };
    }

    const products = await Product.find(filter)
      .populate('createdBy', 'username')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate(
      'createdBy',
      'username email'
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new product (admin only)
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, thc, cbd, price, image, effects, usageType, stock } =
      req.body;

    // Validation
    if (!name || !description || !category || thc === undefined || cbd === undefined || !price) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      category,
      thc,
      cbd,
      price,
      image: image || 'https://via.placeholder.com/300?text=Cannabis+Product',
      effects: effects || [],
      usageType: usageType || 'Smoking',
      stock: stock || 10,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
