'use strict';

const { User, Content } = require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([

      User.create({
        name: "bemaster",
        email: "bemaster@correo.com",
        password: bcrypt.hashSync("123456789", +authConfig.rounds),
        // content: [
        //   {
        //     title: "TitleA",
        //     description: "descriptionA",
        //     file: "fileA",
        //     category:[{name:"entretenimiento"}]
        //   },
        //   {
        //     title: "TitleB",
        //     description: "descriptionB",
        //     file: "fileB",
        //     category:[{name:"infantil"}]
        //   },
        //   {
        //     title: "TitleC",
        //     description: "descriptionC",
        //     file: "fileC",
        //     category:[{name:"adultos"}]
        //   },
        // ]
      }, 
      {
        include:"content"
      }
      ),

      User.create({
        name: "eolartem",
        email: "eolartem@correo.com",
        password: bcrypt.hashSync("123456789", +authConfig.rounds),
      },{
        include: "content"
      }),

      User.create({
        name: "santiago",
        email: "santiago@correo.com",
        password: bcrypt.hashSync("123456789", +authConfig.rounds),
        
      },{
        include: "content"
      }),


    ])
  },

  down: (queryInterface, Sequelize) => {
    
      return Promise.all([//lista
        queryInterface.bulkDelete('content', null, {}),
        queryInterface.bulkDelete('user', null, {})
      ]);

  }
};
