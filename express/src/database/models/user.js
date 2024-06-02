// user.js

// Export a function that defines the User model
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user", // Model name
    {
      username: {
        type: DataTypes.STRING(32), // Data type for username
        primaryKey: true, // Set username as the primary key
      },
      password_hash: {
        type: DataTypes.STRING(200), // Data type for hashed password
        allowNull: false, // Disallow null values for hashed password
      },
      first_name: {
        type: DataTypes.STRING(40), // Data type for first name
        allowNull: false, // Disallow null values for first name
      },
      last_name: {
        type: DataTypes.STRING(40), // Data type for last name
        allowNull: false, // Disallow null values for last name
      },
      following: {
        type: DataTypes.INTEGER,
        allowNull: false, // Disallow null values for following
      },
      followers: {
        type: DataTypes.INTEGER,
        allowNull: false, // Disallow null values for followers
      },
    },
    {
      // Define model options
      timestamps: false, // Do not add the timestamp attributes (updatedAt, createdAt)
    }
  );
