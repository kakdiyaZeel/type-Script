"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // return queryInterface.bulkInsert("Profiles", [
    //   {
    //     firstName: "TestUser3",
    //     lastName: "LastTestUser3",
    //     email: "TestUser3@gmail.com",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Profiles", null, {});
  },
};
