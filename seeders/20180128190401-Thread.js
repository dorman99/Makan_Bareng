'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Threads', [{
        judulThread: 'makanBareng',
        JenisMakananID: 'spaghetti',
      },{
        judulThread: 'makanBareng',
        JenisMakananID: 'spaghetti'
      },{
        judulThread: 'makanBareng',
        JenisMakananID: 'spaghetti'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
