// post.controller.js

// Import the database module
const db = require("../database");

// Controller to handle fetching all posts from the database
exports.all = async (req, res) => {
  // Fetch all posts from the database
  const posts = await db.post.findAll();

  // Respond with the fetched posts
  res.json(posts);
};

// Controller to handle creating a new post in the database
exports.create = async (req, res) => {
  // Create a new post in the database using data from the request body
  const post = await db.post.create({
    text: req.body.text, // Extract post text from request body
    username: req.body.username, // Extract username from request body
  });

  // Respond with the created post
  res.json(post);
};
