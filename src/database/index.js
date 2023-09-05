const { Sequelize } = require('sequelize');


const configDatabase = require('./config/config');
const database = new Sequelize(configDatabase);







module.exports = database;

