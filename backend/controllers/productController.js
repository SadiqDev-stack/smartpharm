import Product from "../models/product.js";
import { log } from "../middlewares/logger.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const { search = "", type = "", page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const userId = req.user?._id;

    const filter = { userId };
    if (search) filter.name = { $regex: search, $options: "i" };
    if (type) filter.type = type;

    const products = await Product.find(filter)
      .limit(limit * 1)
      .skip(skip)
      .exec();

    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
};

// Get single product
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("relatedProducts");

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, data: product });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching product" });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    const { name, type, dosage, pricing, stock, expiryDate, relatedProducts, mediaSource } = req.body;
    const userId = req.user?._id;

    if (!name || !type) {
      return res.status(400).json({ success: false, message: "Name and type are required" });
    }

    const product = new Product({
      name,
      type,
      dosage,
      pricing,
      stock,
      expiryDate,
      relatedProducts,
      mediaSource,
      userId,
      createdBy: userId,
    });

    await product.save();
    res.status(201).json({ success: true, data: product, message: "Product created" });
  } catch (err) {
    log(err.message, "bad");
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Product name already exists" });
    }
    res.status(500).json({ success: false, message: "Error creating product" });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const userId = req.user?._id;

    const product = await Product.findOneAndUpdate(
      { _id: id, userId },
      { ...updates, updatedAt: new Date() },
      { new: true }
    );

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Add to price history if price changed
    if (updates.pricing) {
      product.priceHistory = product.priceHistory || [];
      product.priceHistory.push({
        date: new Date(),
        price: updates.pricing[0]?.amount,
        unit: updates.pricing[0]?.unit,
      });
      await product.save();
    }

    res.json({ success: true, data: product, message: "Product updated" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error updating product" });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const product = await Product.findOneAndDelete({ _id: id, userId });

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error deleting product" });
  }
};

// Get expiry products
export const getExpiryProducts = async (req, res) => {
  try {
    const userId = req.user?._id;
    const today = new Date();
    const oneYearFromNow = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);

    const products = await Product.find({
      userId,
      expiryDate: { $lte: oneYearFromNow, $gte: today },
    }).sort({ expiryDate: 1 });

    res.json({ success: true, data: products });
  } catch (err) {
    log(err.message, "bad");
    res.status(500).json({ success: false, message: "Error fetching expiry products" });
  }
};
