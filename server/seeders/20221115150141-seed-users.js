'use strict';

const { hashPassword } = require('../helpers/hashPassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = require('../data/users.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      el.password = hashPassword(el.password)
      return el
    });

    const customers = require('../data/customers.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      el.password = hashPassword(el.password)
      return el
    });
    await queryInterface.bulkInsert('Users', users, {})
    await queryInterface.bulkInsert('Users', customers, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
