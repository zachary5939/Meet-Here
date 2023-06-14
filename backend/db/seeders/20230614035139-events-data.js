"use strict";

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "Events";
    await queryInterface.bulkInsert(options, [
      {
        groupId: 1,
        venueId: 1,
        name: "Japanese and Korean Car Show",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type: "In person",
        capacity: 500,
        price: 0,
        startDate: "2023-10-15 9:00:00",
        endDate: "2023-10-15 16:00:00",
      },
      {
        groupId: 1,
        venueId: 1,
        name: "American Car Show",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type: "In person",
        capacity: 500,
        price: 0,
        startDate: "2023-10-22 9:00:00",
        endDate: "2023-10-22 16:00:00",
      },
      {
        groupId: 2,
        venueId: 2,
        name: "2000s Skating Night",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type: "In person",
        capacity: 100,
        price: 20.0,
        startDate: "2023-09-23 19:00:00",
        endDate: "2023-05-05 21:30:00",
      },
      {
        groupId: 3,
        venueId: 3,
        name: "Super Smash Bros. Tournament",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type: "In person",
        capacity: 70,
        price: 10.0,
        startDate: "2023-07-22 12:00:00",
        endDate: "2023-07-22 20:30:00",
      },
      {
        groupId: 3,
        venueId: 2,
        name: "Video Game Nerds Party",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        type: "In person",
        capacity: 100,
        price: 20.0,
        startDate: "2023-08-22 12:00:00",
        endDate: "2023-08-22 20:30:00",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Events";
    await queryInterface.bulkDelete(options);
  },
};
