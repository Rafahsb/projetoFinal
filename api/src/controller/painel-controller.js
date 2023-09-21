const { Sequelize } = require("sequelize");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { ViaturasModel } = require("../model/viaturas-model");
const { Validates } = require("../utils/validates");
const { format } = require("date-fns");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const { HttpHelper } = require("../utils/http-helper");

class PainelController {
  async Dashboard(request, response) {
    const httpHelper = new HttpHelper(response);

    try {
      const data = await ManutencoesModel.sequelize.query(
        "SELECT sum(preco), chassi, marca, modelo FROM viaturas INNER JOIN manutencoes ON manutencoes.id_viatura = viaturas.id_viatura group by chassi, marca, modelo;",
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

    try {
      const data = await ManutencoesModel.sequelize.query(
        "SELECT CASE WHEN EXTRACT(MONTH FROM data_nota) = 1 THEN 'Jan' WHEN EXTRACT(MONTH FROM data_nota) = 2 THEN 'Fev' WHEN EXTRACT(MONTH FROM data_nota) = 3 THEN 'Mar' WHEN EXTRACT(MONTH FROM data_nota) = 4 THEN 'Abr' WHEN EXTRACT(MONTH FROM data_nota) = 5 THEN 'Mai' WHEN EXTRACT(MONTH FROM data_nota) = 6 THEN 'Jun' WHEN EXTRACT(MONTH FROM data_nota) = 7 THEN 'Jul' WHEN EXTRACT(MONTH FROM data_nota) = 8 THEN 'Ago' WHEN EXTRACT(MONTH FROM data_nota) = 9 THEN 'Set' WHEN EXTRACT(MONTH FROM data_nota) = 10 THEN 'Out' WHEN EXTRACT(MONTH FROM data_nota) = 11 THEN 'Nov' WHEN EXTRACT(MONTH FROM data_nota) = 12 THEN 'Dez' END AS mes, SUM(preco) AS total_por_mes FROM manutencoes GROUP BY mes, data_nota ORDER BY EXTRACT(MONTH FROM data_nota);",
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      return httpHelper.ok({ dashboard2: data });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { PainelController };
