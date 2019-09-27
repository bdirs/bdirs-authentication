
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    uuid: DataTypes.STRING,
  }, {});
  User.associate = (models) => {
    User.hasMany(models.UserRole, {foreignKey: "userId", as: "userRoles"});
  };

  return User;
};
