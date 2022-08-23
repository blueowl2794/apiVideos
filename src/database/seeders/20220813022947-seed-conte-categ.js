'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('cont_cate', [//queryInterface: La interfaz que usa Sequelize para comunicarse con todas las bases de datos
        { content_id: 1, cate_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { content_id: 2, cate_id: 2, createdAt: new Date(), updatedAt: new Date() },
        { content_id: 3, cate_id: 3, createdAt: new Date(), updatedAt: new Date() },
        { content_id: 1, cate_id: 4, createdAt: new Date(), updatedAt: new Date() }
      ], {})
    ]);

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cont_cate', null, {});
  }
};
