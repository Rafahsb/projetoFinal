const { Sequelize } = require("sequelize");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { ViaturasModel } = require("../model/viaturas-model");
const { Validates } = require("../utils/validates");
const { format } = require("date-fns");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const { HttpHelper } = require("../utils/http-helper");
const { paginationWhere } = require("../utils/paginationWhere");

class ManutencoesController {
  async criarManutencao(request, response) {
    const httpHelper = new HttpHelper(response);
    const { numero_nota, descricao, preco, data, id_viatura } = request.body;
    try {
      await ManutencoesModel.create({
        numero_nota,
        descricao,
        preco,
        data_nota: data,
        id_viatura,
      });
      return httpHelper.created({
        message: "Manutencoes cadastrada com sucesso!",
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async deletarManutencao(request, response) {
    const httpHelper = new HttpHelper(response);
    const { id } = request.params;
    try {
      await ManutencoesModel.destroy({
        where: {
          id_manutencao: id,
        },
      });

      return httpHelper.noContent();
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async pesquisarManutencao(request, response) {
    const httpHelper = new HttpHelper(response);
    const { id } = request.body;

    try {
      const filtro = await ManutencoesModel.findAll({
        where: {
          id_manutencao: id,
        },
      });
      return httpHelper.ok({ Manutencao: filtro });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async pesquisarManutencoes(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const filtro = await ManutencoesModel.sequelize.query(
        "SELECT * FROM viaturas INNER JOIN manutencoes ON manutencoes.id_viatura = viaturas.id_viatura;",
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      // const filtro = await ManutencoesModel.findAll({});

      console.log(filtro);
      filtro.forEach((manutencao) => {
        manutencao.data_nota = Validates.formatDate(manutencao.data_nota);
        // manutencao.dataValues.data_nota = format(new Date(manutencao.dataValues.data_nota), "dd/MM/yyyy")
      });

      return httpHelper.ok({ Manutencoes: filtro });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async buscarManutencoes(request, response) {
    const httpHelper = new HttpHelper(response);
    let busca;

    const { filtro, page } = request.query || null;

    try {
      if (filtro != "undefined") {
        busca = await paginationWhere(ManutencoesModel, page, {
          where: {
            [Op.or]: [
              { numero_nota: { [Op.like]: `%${filtro}%` } },
              { descricao: { [Op.like]: `%${filtro}%` } },
              { preco: parseFloat(filtro) },
            ],
          },
        });
      } else {
        busca = await paginationWhere(ManutencoesModel, page);
      }

      busca.data.forEach((manutencao) => {
        manutencao.dataValues.data_nota = Validates.formatDate(
          manutencao.dataValues.data_nota
        );
        manutencao.dataValues.data_nota = format(
          new Date(manutencao.dataValues.data_nota),
          "dd/MM/yyyy"
        );
      });

      return httpHelper.ok({
        Manutencoes: busca.data,
        TotalPages: busca.pages,
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async pesquisarTotalManutencoes(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const total = await ManutencoesModel.count();

      return httpHelper.ok({ Total: total });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async atualizarManutencao(request, response) {
    const httpHelper = new HttpHelper(response);
    const { id } = request.params;
    const { numero_nota, descricao, preco, data_nota, id_viatura } =
      request.body;

    try {
      await ManutencoesModel.update(
        {
          numero_nota,
          descricao,
          preco,
          data_nota,
          id_viatura,
        },
        {
          where: {
            id_manutencao: id,
          },
        }
      );

      return httpHelper.ok({
        message: `A Manutencoes foi atualizada com sucesso`,
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { ManutencoesController };
