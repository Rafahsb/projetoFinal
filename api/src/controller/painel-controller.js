const { Sequelize } = require("sequelize");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { ViaturasModel } = require("../model/viaturas-model");
const { Validates } = require("../utils/validates");
const { format } = require("date-fns");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const { HttpHelper } = require("../utils/http-helper");
const { UsuariosModel } = require("../model/usuarios-model");

class PainelController {
  async Dashboard(request, response) {
    const httpHelper = new HttpHelper(response);

    try {
      const data = await ManutencoesModel.sequelize.query(
        `SELECT sum(preco), placa, marca, modelo FROM viaturas 
        INNER JOIN manutencoes ON manutencoes.id_viatura = viaturas.id_viatura group by placa, marca, modelo;`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      return httpHelper.ok({ dashboard: data });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async Dashboard2(request, response) {
    const httpHelper = new HttpHelper(response);
    let { ano } = request.params;
    const currentDate = new Date();

    if (ano < 1980 || ano > currentDate.getFullYear()) {
      return httpHelper.badRequest({
        message: "O ano deve ser entre 1980 e o ano atual",
        variant: "danger",
      });
    }
    if (ano == "undefined" || ano == undefined) {
      ano = currentDate.getFullYear();
    }
    try {
      const data = await ManutencoesModel.sequelize.query(
        `WITH meses AS (
          SELECT generate_series(1, 12) AS mes
        )
        SELECT
          CASE
            WHEN m.mes = 1 THEN 'Jan'
            WHEN m.mes = 2 THEN 'Fev'
            WHEN m.mes = 3 THEN 'Mar'
            WHEN m.mes = 4 THEN 'Abr'
            WHEN m.mes = 5 THEN 'Mai'
            WHEN m.mes = 6 THEN 'Jun'
            WHEN m.mes = 7 THEN 'Jul'
            WHEN m.mes = 8 THEN 'Ago'
            WHEN m.mes = 9 THEN 'Set'
            WHEN m.mes = 10 THEN 'Out'
            WHEN m.mes = 11 THEN 'Nov'
            WHEN m.mes = 12 THEN 'Dez'
          END AS mes, COALESCE(SUM(preco), 0) AS total_por_mes
        FROM meses m
        LEFT JOIN manutencoes ma ON EXTRACT(YEAR FROM ma.data_nota) = ${ano} AND EXTRACT (MONTH FROM ma.data_nota) = m.mes
        GROUP BY m.mes
        ORDER BY m.mes;`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      return httpHelper.ok({ dashboard2: data, ano: ano });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async Dashboard3(request, response) {
    const httpHelper = new HttpHelper(response);

    try {
      const data = await UsuariosModel.findAll({
        attributes: ["unidade", [Sequelize.fn("COUNT", "unidade"), "total"]],
        group: ["unidade"],
      });

      return httpHelper.ok({ dashboard: data });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async Dashboard4(request, response) {
    const httpHelper = new HttpHelper(response);

    try {
      const data = await ViaturasModel.findAll({
        attributes: ["orgao_vinculado", [Sequelize.fn("COUNT", "orgao_vinculado"), "total"]],
        group: ["orgao_vinculado"],
      });

      return httpHelper.ok({ dashboard: data });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { PainelController };
