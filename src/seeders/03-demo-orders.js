'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('orders', [
      {
        userId: 2, // customer@example.com
        totalPrice: 1199,
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        totalPrice: 999,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});
  }
}; 