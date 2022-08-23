'use strict';

module.exports = (sequelize, DataTypes) => {

  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,   
    },
  }, {
    tableName: "category"
  });

  Category.associate = function(models) {
    // Category.hasMany(models.Content, { as: "content", foreignKey: "categoryId" });
    Category.belongsToMany(models.Content, { as: "content", through: "cont_cate", foreignKey: "cate_id" });
    
  };

  // Comprueba que el usuario es administrador
  // User.isAdmin = function(roles) {
  //   let tmpArray = [];
  //   roles.forEach(role => tmpArray.push(role.role));

  //   return tmpArray.includes('admin');
  // }

  return Category;
};