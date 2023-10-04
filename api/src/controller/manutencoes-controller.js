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
    const { numero_nota, descricao, preco, data, id_viatura } = request.body;
    try {
      if (!numero_nota || !descricao || !preco || !id_viatura || !data) {
        return httpHelper.badRequest({
          message: "Ops! faltou preencher algum campo!",
          variant: "danger",
        });
      }

      const manutencaoExists = await ManutencoesModel.sequelize.query(`
      SELECT * FROM viaturas INNER JOIN manutencoes ON manutencoes.id_viatura = viaturas.id_viatura
      WHERE viaturas.id_viatura =  ${id_viatura} and data_nota isNull
      order by id_manutencao desc
      limit 1;
   `);

      if (manutencaoExists[0][0] != undefined) {
        return httpHelper.badRequest({
          message:
            "Status inválido! A viatura possui uma manutenção em andamento, finalize-a primeiro.",
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

      const dataInformadaManutencao = new Date(data);
      const dataAtual = new Date();

      if (dataInformadaManutencao > dataAtual) {
        return httpHelper.badRequest({
          message: "Data inválida!",
          variant: "danger",
        });
      }

      await ManutencoesModel.create({
        numero_nota,
        descricao,
        preco,
        id_viatura,
        data_manutencao: dataInformadaManutencao,
      });

      await ViaturasModel.update(
        {
          status: "manutencao",
          piloto: '',
        },
        {
          where: {
            id_viatura: id_viatura,
          },
        }
      );

      return httpHelper.created({
        message:
          "Manutenção cadastrada com sucesso! O status da viatura foi atualizado para 'Manutencao'",
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

      const data = await ManutencoesModel.findOne({
        where: {
          id_manutencao: id,
        },
      });

      console.log(data);

      await ManutencoesModel.destroy({
        where: {
          id_manutencao: id,
        },
      });

      const manutencaoExists = await ManutencoesModel.sequelize.query(`
        SELECT * FROM viaturas INNER JOIN manutencoes ON manutencoes.id_viatura = viaturas.id_viatura
        WHERE viaturas.id_viatura =  ${data.dataValues.id_viatura} and data_nota isNull
        order by id_manutencao desc
        limit 1;
      `);

      console.log(manutencaoExists[0][0]);
      if (manutencaoExists[0][0] == undefined) {
        await ViaturasModel.update(
          {
            status: "garagem",
          },
          {
            where: {
              id_viatura: data.dataValues.id_viatura,
            },
          }
        );
       
      }


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
        manutencao.data_manutencao = Validates.formatDate(
          manutencao.data_manutencao
        );
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
    const filtroLowerCase = filtro ? filtro.toLowerCase() : "";

    try {
      if (filtroLowerCase != "undefined" && filtroLowerCase != "") {
        busca = await paginationWhereManut(
          ManutencoesModel,
          page,
          `LOWER(manutencoes.numero_nota) LIKE '%${filtroLowerCase}%' OR LOWER(manutencoes.descricao) LIKE '%${filtroLowerCase}%'`
        );
      } else {
        busca = await paginationWhereManut(ManutencoesModel, page);
      }
      busca.data.forEach((manutencao) => {
        if (manutencao.data_nota) {
          manutencao.data_nota = Validates.formatDate(manutencao.data_nota);
        }
        manutencao.data_manutencao = Validates.formatDate(
          manutencao.data_manutencao
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
    const { numero_nota, descricao, preco, data_manutencao, id_viatura } = request.body;
    let { data_nota } = request.body;
    try {
      if (data_nota === "") {
        data_nota = null;
      }

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

      let dataInformadaNota;

      if (data_nota !== null) {
        dataInformadaNota = new Date(data_nota);
      }
      const dataInformadaManutencao = new Date(data_manutencao);
      const dataAtual = new Date();

      if (
        dataInformadaNota > dataAtual ||
        dataInformadaManutencao > dataAtual
      ) {
        return httpHelper.badRequest({
          message: "Data inválida!",
          variant: "danger",
        });
      }

      if (dataInformadaManutencao > dataInformadaNota && data_nota !== null) {
        return httpHelper.badRequest({
          message: "A data final não pode ser menor que a data inicial!",
          variant: "danger",
        });
      }

      

      await ManutencoesModel.update(
        {
          numero_nota,
          descricao,
          preco,
          data_nota: dataInformadaNota,
          data_manutencao: dataInformadaManutencao,
        },
        {
          where: {
            id_manutencao: id,
          },
        }
      );

      if (data_nota) {
        await ViaturasModel.update(
          {
            status: "garagem",
          },
          {
            where: {
              id_viatura: id_viatura,
            },
          }
        );
        return httpHelper.ok({
          message: `A Manutenção foi atualizada com sucesso. O status da viatura foi alterado para "garagem"`,
          variant: "success",
        });
      }

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
