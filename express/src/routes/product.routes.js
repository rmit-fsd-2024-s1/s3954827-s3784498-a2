const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

// Route to fetch all products
router.get("/", controller.all);

// Route to fetch a product by ID
router.get("/:id", controller.find);

// Route to add hardcoded products to the database
router.post("/seed", async (req, res) => {
  try {
    // Define your hardcoded products
    const products = [
      { name: "Product 1", price: 10, quantity: 100 },
      { name: "Product 2", price: 20, quantity: 50 },
      { name: "Product 3", price: 30, quantity: 75 },
    ];

    // Create products in the database
    await controller.bulkCreate(products);

    res.status(201).json({ message: "Products seeded successfully" });
  } catch (error) {
    console.error("Error seeding products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
