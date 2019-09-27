"use strict";
module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define("Role", {
    name: DataTypes.STRING,
  }, {});
  Roles.associate = (models) => {
    // associations can be defined here
  };
  return Roles;
};
