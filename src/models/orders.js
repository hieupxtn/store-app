'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    paymentStatus: DataTypes.STRING,
    orderPlan: DataTypes.STRING,
    status: DataTypes.STRING,
    ordererName: DataTypes.STRING,
    ordererPhone: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};