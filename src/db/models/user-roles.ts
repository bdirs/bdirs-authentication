"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define("UserRole", {
    userId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER,
  }, {});
  UserRoles.associate = (models) => {
    UserRoles.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id",
    });
    UserRoles.belongsTo(models.Role, {
      foreignKey: "roleId",
      targetKey: "id",
      as: "role",
    });
  };
  return UserRoles;
};
