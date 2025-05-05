'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('coupons', [
      {
        code: 'SALE10',
        discount: 10,
        expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'WELCOME5',
        discount: 5,
        expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('coupons', null, {});
  }
}; 