// user.routes.js

// Export a function that defines routes for users
module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js"); // Import the user controller
  const router = express.Router(); // Create a new router instance

  // Define route for selecting all users
  router.get("/", controller.all);

  // Define route for selecting a single user by ID
  router.get("/select/:id", controller.one);

  // Define route for user login
  router.get("/login", controller.login);

  // Define route for creating a new user
  router.post("/", controller.create);

  // Define route for updating a new user
  router.put("/update/:username", controller.update);

  // Define route for deleting a Uuser
  router.delete("/delete/:username", controller.delete);

  router.post("/follow", controller.follow);

  router.post("/unfollow", controller.unfollow);

  router.get("/:username/following", controller.getFollowing);

  // Add routes to the server under the '/api/users' endpoint
  app.use("/api/users", router);

};
