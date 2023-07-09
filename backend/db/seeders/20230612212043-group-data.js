"use strict";
/** @type {import('sequelize-cli').Migration} */

let options = { tableName: "Groups" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          organizerId: 1,
          name: "Cars Enthusiasts",
          about:
            "We live and breathe the exhaust cars produce.",
          type: "In person",
          private: false,
          city: "Ventura",
          state: "CA",
        },
        {
          organizerId: 2,
          name: "Roller Skating",
          about:
            "Roller skate outdoors or in a roller rink, we love to roller skate!",
          type: "In person",
          private: false,
          city: "Ventura",
          state: "CA",
        },
        {
          organizerId: 3,
          name: "Gamers",
          about:
            "Gamers of all backgrounds come together to connect, share experiences, and create lasting friendships.",
          type: "In person",
          private: true,
          city: "Ventura",
          state: "CA",
        },
      ],
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Groups";
    await queryInterface.bulkDelete(options);
  },
};
