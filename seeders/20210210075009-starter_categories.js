'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [{
      name: 'Sports',
      description: 'All about sports! Talk about your favorite sports and teams.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Movies',
      description: 'Grab your popcorn because it\'s movie time! Chat about your favorite movies.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Software Engineering',
      description: 'Need a space to debug? Want to share your favorite coding meme, we got you.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Games',
      description: 'Start a new console vs pc war all in chat!',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Business',
      description: 'Let\'s get some work done.',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Food',
      description: 'Are you a foodie? Do you like sharing recipes? You\'ve come to the right place.',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {});
  }
};
