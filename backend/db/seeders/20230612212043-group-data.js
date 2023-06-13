"use strict";

let options = { tableName: "Groups" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      options,
      [
        {
          organizerId: 1,
          name: "Cars: and Coffee",
          about:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”",
          type: "In person",
          private: false,
          city: "Ventura",
          state: "CA",
        },
        {
          organizerId: 2,
          name: "Roller Skating: at Skating Plus",
          about:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”",
          type: "In person",
          private: false,
          city: "Ventura",
          state: "CA",
        },
        {
          organizerId: 3,
          name: "Arcade Game: Night",
          about:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”",
          type: "In person",
          private: true,
          city: "Ventura",
          state: "CA",
        },
        // {
        //   organizerId: 3,
        //   name: "Hiking: for Beginners",
        //   about:
        //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.”",
        //   type: "In person",
        //   private: false,
        //   city: "Malibu",
        //   state: "CA",
        // },
      ],

      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Groups";
    await queryInterface.bulkDelete(options);
  },
};
