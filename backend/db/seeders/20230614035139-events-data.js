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
          "Checkout a wide variety of peoples custom JDM & KDM cars. Toyota, Mazda, Hyundai, all of them!",
        type: "In person",
        capacity: 500,
        price: 0,
        startDate: "2023-10-15 9:00:00",
        endDate: "2023-10-15 16:00:00",
      },
      {
        groupId: 1,
        venueId: 1,
        name: "Classic Car Show",
        description:
          "Checkout old classic cars from Americas history",
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
          "Dress in hideous outfits we used to wear in the 2000s and skate to hit songs released in the 2000s",
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
          "1 v 1 fights with the traditional general ruleset. Deodorant required to enter venue.",
        type: "In person",
        capacity: 70,
        price: 10.0,
        startDate: "2023-07-22 12:00:00",
        endDate: "2023-07-22 20:30:00",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Events";
    await queryInterface.bulkDelete(options);
  },
};
