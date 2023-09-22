const { Sequelize } = require("sequelize");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { ViaturasModel } = require("../model/viaturas-model");
const { Validates } = require("../utils/validates");
const { format } = require("date-fns");
const { QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const { HttpHelper } = require("../utils/http-helper");
const { paginationWhere } = require("../utils/paginationWhere");
const { paginationWhereManut } = require("../utils/paginationWhereManut");

class ManutencoesController {
  async criarManutencao(request, response) {
    const httpHelper = new HttpHelper(response);
    console.log("TEste");
    const { numero_nota, descricao, preco, data, id_viatura } = request.body;
    try {
      if (!numero_nota || !descricao || !preco || !id_viatura) {
        return httpHelper.badRequest({
          message: "Ops! faltou preencher algum campo!",
          variant: "danger",
        });
      }

      if (numero_nota.length != 9) {
        return httpHelper.badRequest({
          message:
            "O número da nota deve conter exatamente 9 dígitos numéricos.",
          variant: "danger",
        });
      }

      const notaExists = await ManutencoesModel.findOne({
        where: { numero_nota },
      });

      if (notaExists) {
        return httpHelper.badRequest({
          message: "Já existe uma manutenção com o nota informada!",
          variant: "danger",
        });
      }

      const viaturaExists = await ViaturasModel.findOne({
        where: { id_viatura },
      });

      if (!viaturaExists) {
        return httpHelper.badRequest({
          message: "A viatura informada não existe!",
          variant: "danger",
        });
      }
      const dataInformada = new Date(data);
      const dataAtual = new Date();

      if (dataInformada > dataAtual) {
        return httpHelper.badRequest({
          message: "Data inválida!",
          variant: "danger",
        });
      }

      await ManutencoesModel.create({
        numero_nota,
        descricao,
        preco,
        data_nota: data,
        id_viatura,
      });

      return httpHelper.created({
        message: "Manutenção cadastrada com sucesso!",
        variant: "success",
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
      filtro.forEach((manutencao) => {
        manutencao.data_nota = Validates.formatDate(manutencao.data_nota);
      });

      return httpHelper.ok({ Manutencoes: filtro });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async buscarManutencoes(request, response) {
    const httpHelper = new HttpHelper(response);
    let busca = {};

    const { filtro, page } = request.query || null;

    try {
      if (filtro != "undefined" && filtro != "") {
        busca = await paginationWhereManut(
          ManutencoesModel,
          page,
          `manutencoes.numero_nota LIKE '%${filtro}%' OR manutencoes.descricao LIKE '%${filtro}%'`
        );
      } else {
        busca = await paginationWhereManut(ManutencoesModel, page);
      }

      busca.data.forEach((manutencao) => {
        manutencao.data_nota = Validates.formatDate(manutencao.data_nota);
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
    const { numero_nota, descricao, preco, data, id_viatura } = request.body;

    try {
      if (numero_nota.length != 9) {
        return httpHelper.badRequest({
          message:
            "O número da nota deve conter exatamente 9 dígitos numéricos.",
          variant: "danger",
        });
      }

      const viaturaExists = await ViaturasModel.findOne({
        where: { id_viatura },
      });

      if (!viaturaExists) {
        return httpHelper.badRequest({
          message: "A viatura informada não existe!",
          variant: "danger",
        });
      }
      const dataInformada = new Date(data);
      const dataAtual = new Date();

      if (dataInformada > dataAtual) {
        return httpHelper.badRequest({
          message: "Data inválida!",
          variant: "danger",
        });
      }

      await ManutencoesModel.update(
        {
          numero_nota,
          descricao,
          preco,
          data_nota: data,
          id_viatura,
        },
        {
          where: {
            id_manutencao: id,
          },
        }
      );

      return httpHelper.ok({
        message: `A Manutenção foi atualizada com sucesso`,
        variant: "success",
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { ManutencoesController };
