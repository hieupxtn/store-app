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
      },
      {
        name: 'Tablet',
        description: 'Tablets and iPads',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smartwatch',
        description: 'Smartwatches and wearable devices',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Headphone',
        description: 'Headphones and audio devices',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Camera',
        description: 'Digital cameras and accessories',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more types if needed
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('producttypes', null, {});
  }
}; 