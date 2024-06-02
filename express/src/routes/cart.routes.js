// cart.routes.js

const express = require("express");
const router = express.Router();
const db = require("../database");
const Cart = db.cart; // Access the Cart model directly from db

// Route to fetch all cart items
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.findAll(); // Fetch all cart items from the database
    res.json(carts); // Respond with the list of cart items
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to add a new item to the cart
router.post("/add", async (req, res) => {
  try {
    const { name, price, quantity } = req.body; // Extract data from the request body
    const newItem = await Cart.create({ name, price, quantity }); // Create a new item in the cart
    res.status(201).json(newItem); // Respond with the newly created item
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to remove an item from the cart
router.delete("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract the id from the request parameters
    console.log(`Attempting to delete item with id: ${id}`); // Add logging
    const deletedItemCount = await Cart.destroy({ where: { id } }); // Delete the item from the cart
    if (deletedItemCount === 0) {
      console.log(`Item with id: ${id} not found.`);
      return res.status(404).json({ error: "Item not found" }); // Respond with an error if the item was not found
    }
    console.log(`Item with id: ${id} successfully deleted.`);
    res.status(200).json({ message: "Item removed from cart" }); // Respond with a success message
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
