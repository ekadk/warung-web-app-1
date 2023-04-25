'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const favorites = require('../data/favorites.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    });
    await queryInterface.bulkInsert('Favorites', favorites, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favorites', null, {})
  }
};
