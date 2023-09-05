const { Sequelize } = require("sequelize");
const configDatabase = require("./config/config");

const { UsuarioModel } = require("../model/usuario-model");

const database = new Sequelize(configDatabase);

UsuarioModel.init(database);

module.exports = { database };
