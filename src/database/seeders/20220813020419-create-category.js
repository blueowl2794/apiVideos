'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([

      queryInterface.bulkInsert('category', [
        { name: "entretenimiento", createdAt: new Date(), updatedAt: new Date() },
        { name: "aventura", createdAt: new Date(), updatedAt: new Date() },
        { name: "infantil", createdAt: new Date(), updatedAt: new Date() },
        { name: "adultos", createdAt: new Date(), updatedAt: new Date() }
      ], {})

    ]);

  },

  down: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.bulkDelete('category', null, {}),
    ]);
  }
};