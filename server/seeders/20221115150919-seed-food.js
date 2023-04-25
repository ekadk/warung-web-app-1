'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const food = require('../data/food-new.json').map(el => {
      el.createdAt = el.updatedAt = new Date()
      if(!el.imgUrl) el.imgUrl = 'https://picsum.photos/200?grayscale&blur=2'
      return el
    });

    await queryInterface.bulkInsert('Food', food, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Food', null, {})
  }
};
