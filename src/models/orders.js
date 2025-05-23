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
      Order.belongsTo(models.User, { foreignKey: 'userId' });
      Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
    }
  };
  Order.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true // Allow null for guest orders
    },
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    shippingAddress: DataTypes.JSON,
    paymentMethod: DataTypes.STRING,
    customerName: DataTypes.STRING,
    customerPhone: DataTypes.STRING,
    customerEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};