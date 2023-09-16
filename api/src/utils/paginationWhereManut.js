const { ViaturasModel } = require("../model/viaturas-model");
const { ManutencoesModel } = require("../model/manutencoes-model");

//arquivo pagination.js
const { Sequelize } = require("sequelize");
//função para paginação
async function paginationWhereManut(model, page, where) {
  limit = 5;
  //calcula o offset
  const offset = (page - 1) * limit;
  //busca os dados com limite e offset
  const data = await model.sequelize.query(`SELECT * FROM viaturas INNER JOIN manutencoes ON manutencoes.id_viatura = viaturas.id_viatura ${where ? 'WHERE ' + where : ''} ORDER BY manutencoes.data_nota LIMIT ${limit || 10} OFFSET ${offset || 0};`,
  { limit, offset, where, type: Sequelize.QueryTypes.SELECT, });
  //busca o total de registros
  const count = await model.sequelize.query(`SELECT count(*) FROM manutencoes${where ? ' WHERE ' + where : ''};`, {type: Sequelize.QueryTypes.SELECT});
  // const count = await model.count();


  //calcula o total de páginas
  const pages = Math.ceil(count[0].count / limit);
  //retorna os dados, o total de registros e o total de páginas
  return { data, count, pages };
}

//exporta a função
module.exports = { paginationWhereManut };
