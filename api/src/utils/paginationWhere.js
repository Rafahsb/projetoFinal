//arquivo pagination.js
//função para paginação
async function paginationWhere(model, page, where) {
  limit = 5;
  //calcula o offset
  const offset = (page - 1) * limit;
  //busca os dados com limite e offset
  const data = await model.findAll({ limit, offset, where });
  console.log(data);
  //busca o total de registros
  const count = await model.count({ where: where });
  //calcula o total de páginas
  const pages = Math.ceil(count / limit);
  //retorna os dados, o total de registros e o total de páginas
  return { data, count, pages };
}

//exporta a função
module.exports = { paginationWhere };
