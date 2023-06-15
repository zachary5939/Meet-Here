'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up (queryInterface, Sequelize) {
   options.tableName = 'EventImages';
   await queryInterface.bulkInsert(options, [
    {
      eventId: 1,
      url: 'https://media.ed.edmunds-media.com/hyundai/elantra/2021/oem/2021_hyundai_elantra_sedan_limited_fq_oem_10_1280.jpg',
      preview: true
    },
    {
      eventId: 2,
      url: 'https://bringatrailer.com/wp-content/uploads/2019/10/1970_chevrolet_impala_1571940501e7bebd2b9a60dec12aIMG_8234.jpg?fit=940%2C627',
      preview: true
    },
    {
      eventId: 3,
      url: 'https://www.fountainblu.com/uploads/b/af258320-cdcf-11ea-8c33-2b589f09a310/Rink%20Back%20side%20revos.jpg',
      preview: true
    },
    {
      eventId: 4,
      url: 'https://www.kpl.gov/app/uploads/2019/08/ds-super-smash-bros-tourney-oct19-web.jpg',
      preview: true
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'EventImages';
    await queryInterface.bulkDelete(options)
  }
};
