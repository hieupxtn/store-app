'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products', [
      {
        productCode: 'IP15',
        productName: 'iPhone 15 Pro Max',
        productTypeId: 1,
        price: 1199, // USD
        quantity: 50,
        description: 'Flagship Apple 2023',
        image: 'https://example.com/iphone15.jpg',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productCode: 'DELLXPS',
        productName: 'Dell XPS 13',
        productTypeId: 2,
        price: 999, // USD
        quantity: 30,
        description: 'Ultrabook cao cấp',
        image: 'https://example.com/dellxps13.jpg',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Thêm nhiều sản phẩm khác nếu muốn
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  }
}; 