// Server.js

// Import required modules
const express = require("express"); // Import Express.js framework
const cors = require("cors"); // Import CORS middleware
const db = require("./src/database"); // Import database module

// Database will be sync'ed in the background.
db.sync(); // Synchronize the database schema

const app = express(); // Initialize Express application

// Parse requests of content-type - application/json.
app.use(express.json()); // Middleware to parse JSON requests

// Add CORS support.
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing

// Custom middleware to map id to review_id
app.use("/api/reviews/:id", (req, res, next) => {
  req.review_id = req.params.id;
  next();
});

// Define a simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" }); // Respond with a JSON message
});

// Add user routes.
require("./src/routes/user.routes.js")(express, app); // Include user routes
require("./src/routes/post.routes.js")(express, app); // Include post routes
require("./src/routes/review.routes.js")(express, app); // Include post routes
// Add product routes.
app.use("/api/products", require("./src/routes/product.routes.js")); // Include product routes
app.use("/api/cart", require("./src/routes/cart.routes.js")); //Include cart routes

// Set port, listen for requests.
const PORT = 4000; // Define the port for the server to listen on
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`); // Log a message when the server starts
});
