'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('orderitems', [
      {
        orderId: 1,
        productId: 1,
        quantity: 1,
        price: 1199,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 2,
        quantity: 1,
        price: 999,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orderitems', null, {});
  }
}; 