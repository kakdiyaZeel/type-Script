"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("user", [
      {
        email: "test@gmail.com",
        password: "123456789",
        role: "user",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // return queryInterface.dropTable("Person");
  },
};
