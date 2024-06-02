// cart.js

const { DataTypes } = require("sequelize");

// Define the Product model
const Cart = (sequelize) =>
  sequelize.define(
    "cart", // Model name
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // Define model options
      timestamps: false,
    }
  );

module.exports = Cart;


