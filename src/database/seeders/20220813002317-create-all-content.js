'use strict';

const { Content } = require('../../models/index');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return Promise.all([

      Content.create({
        title: "TitleA",
        description: "descriptionA",
        file: "1660777735183-187723418-Mi proyecto 1 2022-03-01_13-42-31.webm",
        // category:[{
        //   name:"entretenimiento"
        // }]
      }, 
      {
        include:"category"
      }),


      Content.create({
        title: "TitleB",
        description: "descriptionB",
        file: "1660777735183-187723418-Mi proyecto 1 2022-03-01_13-42-31.webm",
        // category:[{name:"infantil"}]
       },{
        include: "category"
      }),


      Content.create({
        title: "TitleC",
        description: "descriptionC",
        file: "1660777735183-187723418-Mi proyecto 1 2022-03-01_13-42-31.webm",
        // category:[{name:"adultos"}]
      },{
        include: "category"
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    
      return Promise.all([//lista
        queryInterface.bulkDelete('content', null, {}),
        // queryInterface.bulkDelete('user', null, {})
      ]);

  }
};
