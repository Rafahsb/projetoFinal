const { Sequelize } = require("sequelize");
const configDatabase = require("./config/config");

const { UsuariosModel } = require("../model/usuarios-model");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { ViaturasModel } = require("../model/viaturas-model");

const database = new Sequelize(configDatabase);

UsuariosModel.init(database);
ManutencoesModel.init(database);
ViaturasModel.init(database);
ManutencoesModel.associate(database.models);
ViaturasModel.associate(database.models);

module.exports = { database };
