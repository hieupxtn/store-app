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
      },
      {
        productCode: 'IPAD2022',
        productName: 'iPad 10th Gen',
        productTypeId: 3,
        price: 449,
        quantity: 40,
        description: 'Apple iPad 10th Generation 2022',
        image: 'https://example.com/ipad10.jpg',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productCode: 'GWS5',
        productName: 'Galaxy Watch 5',
        productTypeId: 4,
        price: 299,
        quantity: 60,
        description: 'Samsung Galaxy Watch 5',
        image: 'https://example.com/galaxywatch5.jpg',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productCode: 'SONYWH1000XM5',
        productName: 'Sony WH-1000XM5',
        productTypeId: 5,
        price: 399,
        quantity: 25,
        description: 'Sony Noise Cancelling Headphones',
        image: 'https://example.com/sonywh1000xm5.jpg',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productCode: 'CANONM50',
        productName: 'Canon EOS M50',
        productTypeId: 6,
        price: 649,
        quantity: 15,
        description: 'Canon Mirrorless Camera',
        image: 'https://example.com/canonm50.jpg',
        rating: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productCode: 'MACBOOKAIR',
        productName: 'MacBook Air M2',
        productTypeId: 2,
        price: 1199,
        quantity: 20,
        description: 'Apple MacBook Air M2 2022',
        image: 'https://example.com/macbookairm2.jpg',
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        productCode: 'PIXEL7',
        productName: 'Google Pixel 7',
        productTypeId: 1,
        price: 599,
        quantity: 35,
        description: 'Google Pixel 7 smartphone',
        image: 'https://example.com/pixel7.jpg',
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