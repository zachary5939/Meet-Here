"use strict";

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
options.tableName = "Memberships";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          groupId: 1,
          status: "organizer",
        },
        {
          userId: 2,
          groupId: 2,
          status: "co-host",
        },
        {
          userId: 3,
          groupId: 2,
          status: "member",
        },
        {
          userId: 2,
          groupId: 3,
          status: "member",
        },
        {
          userId: 1,
          groupId: 3,
          status: "member",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Memberships";
    await queryInterface.bulkDelete(options);
  },
};
