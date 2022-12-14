'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.createTable('user_role', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "role",
          key: "id"
        },
        onDelete: "CASCADE"

      },
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

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('user_role');
  }
};