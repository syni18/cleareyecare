const mongoose = require("mongoose");

// Define the schema for the product
const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  brand: String,
  category: String,
  thumbnail: String,
  images: [String],
  quantity: Number,
});

// Create the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
