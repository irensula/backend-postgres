const knex = require('knex');
const config = require('./utils/config');

module.exports = knex(config.DATABASE_OPTIONS);