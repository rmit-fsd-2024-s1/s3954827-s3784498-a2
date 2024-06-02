module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "review",
    {
      review_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'reviews', // Explicitly set the table name to 'reviews'
      timestamps: false,
    }
  );
