'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Brands', [
      {
        name: 'Apple',
        description: 'Apple Inc. là một tập đoàn công nghệ đa quốc gia của Mỹ chuyên thiết kế, phát triển và bán các sản phẩm điện tử tiêu dùng, phần mềm máy tính và dịch vụ trực tuyến.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Samsung',
        description: 'Samsung Electronics là một công ty điện tử đa quốc gia của Hàn Quốc, chuyên sản xuất các thiết bị điện tử tiêu dùng, điện thoại thông minh, TV và các thiết bị bán dẫn.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sony',
        description: 'Sony Corporation là một tập đoàn đa quốc gia của Nhật Bản, chuyên sản xuất các sản phẩm điện tử tiêu dùng, thiết bị chơi game, phim ảnh và âm nhạc.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Sony_logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'LG',
        description: 'LG Electronics là một công ty điện tử đa quốc gia của Hàn Quốc, chuyên sản xuất TV, điện thoại thông minh, thiết bị gia dụng và các sản phẩm điện tử khác.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/LG_logo_%282015%29.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Xiaomi',
        description: 'Xiaomi Corporation là một công ty điện tử và công nghệ đa quốc gia của Trung Quốc, chuyên sản xuất điện thoại thông minh, thiết bị thông minh và các sản phẩm điện tử tiêu dùng.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Xiaomi_logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Huawei',
        description: 'Huawei Technologies là một công ty công nghệ đa quốc gia của Trung Quốc, chuyên sản xuất thiết bị viễn thông, điện thoại thông minh và các sản phẩm điện tử tiêu dùng.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Huawei_logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Asus',
        description: 'ASUS là một công ty đa quốc gia của Đài Loan chuyên sản xuất máy tính, điện thoại thông minh, bo mạch chủ, card đồ họa và các thiết bị điện tử khác.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dell',
        description: 'Dell Technologies là một công ty công nghệ đa quốc gia của Mỹ, chuyên phát triển, bán, sửa chữa và hỗ trợ máy tính cá nhân và các sản phẩm liên quan.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Dell_logo_2016.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'HP',
        description: 'HP Inc. là một công ty công nghệ đa quốc gia của Mỹ, chuyên sản xuất máy tính cá nhân, máy in và các sản phẩm phần cứng khác.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lenovo',
        description: 'Lenovo Group Limited là một công ty công nghệ đa quốc gia của Trung Quốc, chuyên sản xuất máy tính cá nhân, máy tính bảng, điện thoại thông minh và các thiết bị điện tử khác.',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Lenovo_logo_2015.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Brands', null, {});
  }
}; 