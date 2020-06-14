require("dotenv").config();
const uuid = require("uuid/v4");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async(queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("Users", [{
        username: "admin",
        email: process.env.SUPER_ADMIN_EMAIL,
        password: await bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD),
        role: "superAdmin",
        createdAt: new Date(),
        updatedAt: new Date(),
        uuid: uuid()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  },
};
