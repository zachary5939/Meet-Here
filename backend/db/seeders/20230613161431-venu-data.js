"use strict";

let options = { tableName: "Venues" };
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const venues = [
      {
        groupId: 1,
        address: "Ventura Fairgrounds",
        city: "Ventura",
        state: "CA",
        lat: 34.27577,
        lng: -119.29909,
      },
      {
        groupId: 2,
        address: "Skating Plus",
        city: "Ventura",
        state: "CA",
        lat: 34.25778,
        lng: -119.21598,
      },
      {
        groupId: 3,
        address: "Pastime Legends",
        city: "Ventura",
        state: "CA",
        lat: 34.27771,
        lng: -119.26966,
      },
    ];
    options.tableName = "Venues";
    await queryInterface.bulkInsert(options, venues, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "Venues";
    await queryInterface.bulkDelete(
      options,
      {
        address: {
          [Op.in]: ["Ventura Fairground", "Skating Plus", "Pastime Legends"],
        },
      },
      {}
    );
  },
};
