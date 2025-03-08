'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  History.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    ordererName: DataTypes.STRING,
    ordererPhone: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};