'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([

      queryInterface.bulkInsert('role', [
        { role: "admin", createdAt: new Date(), updatedAt: new Date() },
        { role: "user", createdAt: new Date(), updatedAt: new Date() },
        { role: "usermenor", createdAt: new Date(), updatedAt: new Date() },
        // { role: "userB", createdAt: new Date(), updatedAt: new Date() }
      ], {})

    ]);

  },

  down: (queryInterface, Sequelize) => {

    return Promise.all([
      queryInterface.bulkDelete('role', null, {}),
    ]);
  }
};
