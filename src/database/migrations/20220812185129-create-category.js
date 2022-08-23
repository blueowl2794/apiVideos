'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // contentId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //     model: "content",
      //     key: "id"
      //   },
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('category');
  }
};