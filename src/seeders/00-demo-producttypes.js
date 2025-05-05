'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('producttypes', [
      {
        name: 'Phone',
        description: 'Smartphones and mobile devices',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Laptop',
        description: 'Laptops and notebooks',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Add more types if needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('producttypes', null, {});
  }
}; 