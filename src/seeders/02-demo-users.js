'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin123', 10),
        firstName: 'Admin',
        lastName: 'User',
        address: '123 Admin St',
        gender: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'customer@example.com',
        password: bcrypt.hashSync('customer123', 10),
        firstName: 'John',
        lastName: 'Doe',
        address: '456 Customer Ave',
        gender: true,
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
}; 