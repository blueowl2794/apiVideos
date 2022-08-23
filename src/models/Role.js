'use strict';
module.exports = (sequelize, DataTypes) => {

  const Role = sequelize.define('Role', {
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "role"
  });

  Role.associate = function(models) {
    Role.belongsToMany(models.User, { as: "user", through: "user_role", foreignKey: "role_id" });//Una FOREIGN KEY es una clave (campo de una columna) que sirve para relacionar dos tablas. El campo FOREIGN KEY se relaciona o vincula con la PRIMARY KEY de otra tabla de la bbdd
  };// relacion de muchos a muchos belongsToMany, through: "user_role" utilizando la tabla "user_role" como tabla de unión

  return Role;
};