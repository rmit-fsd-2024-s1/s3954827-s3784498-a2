// cart.controller.js

const { Cart } = require("../database");

module.exports = {
  getAllCarts: async (req, res) => {
    try {
      console.log("Fetching all carts from the database.");
      const carts = await Cart.findAll();
      console.log("Fetched carts:", carts);
      res.json(carts);
    } catch (error) {
      console.error("Error fetching carts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  addCartItem: async (req, res) => {
    try {
      console.log("Received POST request to add item to cart:", req.body);
      const { name, price, quantity } = req.body;
      const newItem = await Cart.create({ name, price, quantity });
      console.log("Added item to cart:", newItem);
      res.status(201).json(newItem);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
