'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.ProductType, { foreignKey: 'productTypeId' });
      Product.hasMany(models.Review, { foreignKey: 'productId' });
      Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
      Product.hasMany(models.ShoppingCart, { foreignKey: 'productId' });
    }
  };
  Product.init({
    productCode: DataTypes.STRING,
    productName: DataTypes.STRING,
    productTypeId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    quantityLimit: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};