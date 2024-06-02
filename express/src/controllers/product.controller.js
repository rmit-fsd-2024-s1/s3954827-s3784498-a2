const db = require("../database");
const Product = db.product;

// Controller to handle fetching all products from the database
exports.all = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle fetching a product by ID
exports.find = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to handle bulk creation of products
exports.bulkCreate = async (products) => {
  try {
    await Product.bulkCreate(products);
  } catch (error) {
    console.error("Error bulk creating products:", error);
    throw error;
  }
};
