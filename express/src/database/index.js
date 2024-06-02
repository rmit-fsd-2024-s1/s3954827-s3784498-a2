// index.js

// Import necessary modules
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

// Create a database object
const db = {
  Op: Sequelize.Op, // Operator aliases
};

// Create a Sequelize instance
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST, // Database host
  dialect: config.DIALECT, // Database dialect (MySQL)
});

// Include models
db.user = require("./models/user.js")(db.sequelize, DataTypes); // Include the user model
db.post = require("./models/post.js")(db.sequelize, DataTypes); // Include the post model
db.product = require("./models/product.js")(db.sequelize, DataTypes); // Include the product model
db.review = require("./models/review.js")(db.sequelize, DataTypes); // Include the review model
db.cart = require("./models/cart.js")(db.sequelize, DataTypes); // Include the cart model

// Define associations
db.product.hasMany(db.review, { as: "reviews", foreignKey: "product_id" });

db.review.belongsTo(db.product, {
  foreignKey: { name: "product_id", allowNull: false }, // Assuming 'product_id' is the correct column name in the reviews table
});

db.post.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
}); // Define a many-to-one relationship between posts and users

db.review.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
}); // Define a many-to-one relationship between reviews and users

// Define follow/unfollow associations
db.user.belongsToMany(db.user, {
  as: "Followers",
  through: "user_followers",
  foreignKey: "followingId",
});
db.user.belongsToMany(db.user, {
  as: "Following",
  through: "user_followers",
  foreignKey: "followerId",
});

// Include a method for syncing the database schema and seeding initial data
db.sync = async () => {
  // Sync schema
  await db.sequelize.sync({ alter: true });

  // Optionally sync with force (destructive operation)
  // await db.sequelize.sync({ force: true });

  // Seed initial data if necessary
  await seedData();
};

// Function to seed initial data
async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary
  if (count > 0) return;

  const argon2 = require("argon2");

  // Hash passwords and create sample users
  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({
    username: "mbolger",
    password_hash: hash,
    first_name: "Matthew",
    last_name: "Bolger",
  });

  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({
    username: "shekhar",
    password_hash: hash,
    first_name: "Shekhar",
    last_name: "Kalra",
  });
}

// Export the database object
module.exports = db;
