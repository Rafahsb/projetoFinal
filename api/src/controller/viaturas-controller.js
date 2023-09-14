const { HttpHelper } = require("../utils/http-helper");
const { Op } = require("sequelize");
const { ViaturasModel } = require("../model/viaturas-model");
const { paginationWhere } = require("../utils/paginationWhere");

class ViaturaController {
  async criarViatura(request, response) {
    const httpHelper = new HttpHelper(response);
    const {
      marca,
      modelo,
      chassi,
      portas,
      bancos,
      cor,
      kilometragem,
      orgao_vinculado,
      batalhao,
      piloto,
    } = request.body;
    try {
      await ViaturasModel.create({
        marca,
        modelo,
        chassi,
        portas,
        bancos,
        cor,
        kilometragem,
        orgao_vinculado,
        batalhao,
        piloto,
      });

      return httpHelper.created({
        message: "Viatura cadastrada com sucesso!",
        variant: "success",
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async deletarViatura(request, response) {
    const httpHelper = new HttpHelper(response);
    const { id } = request.params;
    try {
      await ViaturasModel.destroy({
        where: {
          id_viatura: id,
        },
      });

      return httpHelper.noContent();
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async buscarViaturas(request, response) {
    const httpHelper = new HttpHelper(response);
    let busca = {};
    const { filtro, page } = request.query || null;

    try {
      if (filtro != "undefined") {
        busca = await paginationWhere(ViaturasModel, page, {
          [Op.or]: [
            { marca: { [Op.like]: `%${filtro}%` } },
            { modelo: { [Op.like]: `%${filtro}%` } },
            { chassi: { [Op.like]: `%${filtro}%` } },
            { cor: { [Op.like]: `%${filtro}%` } },
            { orgao_vinculado: { [Op.like]: `%${filtro}%` } },
            { batalhao: { [Op.like]: `%${filtro}%` } },
            { piloto: { [Op.like]: `%${filtro}%` } },
          ],
        });
      } else {
        busca = await paginationWhere(ViaturasModel, page);
      }
      return httpHelper.ok({ Viaturas: busca.data, TotalPages: busca.pages });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async pesquisarTotalViaturas(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const total = await ViaturasModel.count();
      return httpHelper.ok({ Total: total });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async pesquisarViatura(request, response) {
    const httpHelper = new HttpHelper(response);
    const { id } = request.body;

    try {
      const filtro = await ViaturasModel.findAll({
        where: {
          id_viatura: id,
        },
      });

      return httpHelper.ok({ Viatura: filtro });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async pesquisarViaturas(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const filtro = await ViaturasModel.findAll({});

      return httpHelper.ok({ Viaturas: filtro });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async atualizarViatura(request, response) {
    const httpHelper = new HttpHelper(response);

    try {
      const { id } = request.params;
      const {
        marca,
        modelo,
        chassi,
        portas,
        bancos,
        cor,
        kilometragem,
        orgao_vinculado,
        batalhao,
        piloto,
      } = request.body;
      if (!id) return httpHelper.badRequest("Parâmetros inválidos!");
      if (portas > 5) {
        return httpHelper.badRequest({
          message: "A quantidades de portas não pode ser maior que 4.",
          variant: "danger",
        });
      }
      const viaturaExists = await ViaturasModel.findOne({ id_viatura: id });

      if (!viaturaExists) return httpHelper.notFound("Viatura não encontrada!");

      await ViaturasModel.update(
        {
          id_viatura: id,
          marca,
          modelo,
          chassi,
          portas,
          bancos,
          cor,
          kilometragem,
          orgao_vinculado,
          batalhao,
          piloto,
        },
        {
          where: {
            id_viatura: id,
          },
        }
      );

      return httpHelper.ok({
        message: "Viatura atualizada com sucesso!",
        variant: "success",
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { ViaturaController };
