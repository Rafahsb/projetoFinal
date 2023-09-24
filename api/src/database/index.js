const { Sequelize } = require("sequelize");
const configDatabase = require("./config/config");

const { UsuariosModel } = require("../model/usuarios-model");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { ViaturasModel } = require("../model/viaturas-model");
const { HistoricoKmModel } = require("../model/historico-km-model");

const database = new Sequelize(configDatabase);

UsuariosModel.init(database);
ManutencoesModel.init(database);
ViaturasModel.init(database);
HistoricoKmModel.init(database);
ManutencoesModel.associate(database.models);
HistoricoKmModel.associate(database.models);
ViaturasModel.associate(database.models);

module.exports = { database };
