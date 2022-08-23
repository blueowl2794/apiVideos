'use strict';

module.exports = (sequelize, DataTypes) => {

  const Content = sequelize.define('Content', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    file: DataTypes.TEXT
  }, {
    tableName: "content"
  });

  Content.associate = function(models) {
    // Content.hasMany(models.Category, { as: "category", foreignKey: "contentId" });
    Content.belongsToMany(models.Category, { as: "category", through: "cont_cate", foreignKey: "content_id" });
  };
  return Content;
};