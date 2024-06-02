// post.routes.js

// Export a function that defines routes for posts
module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js"); // Import the post controller
  const router = express.Router(); // Create a new router instance

  // Define route for selecting all posts
  router.get("/", controller.all);

  // Define route for creating a new post
  router.post("/", controller.create);

  // Add routes to the server under the '/api/posts' endpoint
  app.use("/api/posts", router);
};
