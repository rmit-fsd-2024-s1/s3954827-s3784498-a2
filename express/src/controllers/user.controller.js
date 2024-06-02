// user.controller.js

const db = require("../database"); // Import the database module
const argon2 = require("argon2"); // Import Argon2 for password hashing

// Controller to handle fetching all users from the database
exports.all = async (req, res) => {
  // Fetch all users from the database
  const users = await db.user.findAll();

  // Respond with the fetched users
  res.json(users);
};

// Controller to handle fetching a single user from the database by ID
exports.one = async (req, res) => {
  // Fetch a single user from the database by primary key (ID)
  const user = await db.user.findByPk(req.params.id);

  // Respond with the fetched user
  res.json(user);
};

// Controller to handle user login by username and password
exports.login = async (req, res) => {
  // Find a user in the database by username
  const user = await db.user.findByPk(req.query.username);

  // If no user found or password does not match, respond with null (login failed)
  if (
    user === null ||
    !(await argon2.verify(user.password_hash, req.query.password))
  )
    res.json(null); // Login failed
  else res.json(user); // Respond with the user
};

// Controller to handle creating a new user in the database
exports.create = async (req, res) => {
  // Hash the password using Argon2
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  // Create a new user in the database using data from the request body
  const user = await db.user.create({
    username: req.body.username, // Extract username from request body
    password_hash: hash, // Store hashed password
    first_name: req.body.firstname, // Extract first name from request body
    last_name: req.body.lastname, // Extract last name from request body
  });

  // Respond with the created user
  res.json(user);
};

// Update user controller
exports.update = async (req, res) => {
  const { username } = req.params;
  const updatedData = req.body;

  try {
    const user = await db.user.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.update(updatedData);

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};  

//delete user controller
exports.delete = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await db.user.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

exports.follow = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    const follower = await db.user.findByPk(followerId);
    const following = await db.user.findByPk(followingId);

    if (!follower || !following) {
      return res.status(404).json({ message: "User not found" });
    }

    await follower.addFollowing(following);
    await follower.increment('following', { by: 1 });
    await following.increment('followers', { by: 1 });

    res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error following user", error });
  }
};

exports.unfollow = async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    const follower = await db.user.findByPk(followerId);
    const following = await db.user.findByPk(followingId);

    if (!follower || !following) {
      return res.status(404).json({ message: "User not found" });
    }

    await follower.removeFollowing(following);
    await follower.decrement('following', { by: 1 });
    await following.decrement('followers', { by: 1 });

    res.status(200).json({ message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unfollowing user", error });
  }
};

// to get following numbers
exports.getFollowing = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await db.user.findByPk(username, {
      include: [
        {
          model: db.user,
          as: 'Following',
          attributes: ['username']
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingUsernames = user.Following.map(following => following.username);
    res.status(200).json(followingUsernames);
  } catch (error) {
    res.status(500).json({ message: "Error fetching following list", error });
  }
};