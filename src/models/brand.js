'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Product, {
        foreignKey: 'brandId',
        as: 'products'
      });
    }
  }
  
  Brand.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    logo: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Brand',
  });
  
  return Brand;
}; 