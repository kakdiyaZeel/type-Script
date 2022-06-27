"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Profiles", [
      {
        firstName: "TestUser1",
        lastName: "LastTestUser1",
        email: "TestUser@gmail.com",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Profiles");
  },
};
