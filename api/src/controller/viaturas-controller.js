const { HttpHelper } = require("../utils/http-helper");
const { Op, where } = require("sequelize");
const { ViaturasModel } = require("../model/viaturas-model");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { HistoricoKmModel } = require("../model/historico-km-model");
const { paginationWhere } = require("../utils/paginationWhere");

class ViaturaController {
  async criarViatura(request, response) {
    const httpHelper = new HttpHelper(response);
    const {
      marca,
      modelo,
      chassi,
      placa,
      portas,
      bancos,
      cor,
      quilometragem,
      orgao_vinculado,
      piloto,
    } = request.body;

    if (
      !marca ||
      !modelo ||
      !chassi ||
      !portas ||
      !bancos ||
      !cor ||
      !quilometragem ||
      !orgao_vinculado ||
      !placa ||
      !piloto
    ) {
      return httpHelper.badRequest({
        message: "Ops! faltou preencher algum campo!",
        variant: "danger",
      });
    }

    const viaturaChassiExists = await ViaturasModel.findOne({
      where: { chassi },
    });

    const viaturaPlacaExists = await ViaturasModel.findOne({
      where: { placa },
    });

    if (chassi.length != 17) {
      return httpHelper.badRequest({
        message: "O chassi deve conter exatamente 17 dígitos numéricos.",
        variant: "danger",
      });
    }

    if (bancos > 8) {
      return httpHelper.badRequest({
        message: "A quantidade de bancos não pode ser maior que 8",
        variant: "danger",
      });
    }

    if (portas > 6) {
      return httpHelper.badRequest({
        message: "A quantidade de portas não pode ser maior que 6",
        variant: "danger",
      });
    }

    if (quilometragem >= 1000000 || quilometragem < 0) {
      return httpHelper.badRequest({
        message: "A quilometragem não pode ser maior que 1 milhão",
        variant: "danger",
      });
    }

    if (piloto.length < 3) {
      return httpHelper.badRequest({
        message: "O nome do piloto deve ter pelo menos 3 caracteres",
        variant: "danger",
      });
    }

    

    if (viaturaChassiExists) {
      return httpHelper.badRequest({
        message: "Já existe um veículo com o chassi informado!",
        variant: "danger",
      });
    }

    if (viaturaPlacaExists) {
      return httpHelper.badRequest({
        message: "Já existe um veículo com a placa informada!",
        variant: "danger",
      });
    }


    try {
      const viaturaCreated = await ViaturasModel.create({
        marca,
        modelo,
        chassi,
        portas,
        bancos,
        cor,
        quilometragem,
        orgao_vinculado,
        placa: placa.toUpperCase(),
        piloto,
      });

      await HistoricoKmModel.create({
        quilometragem,
        data: new Date(),
        id_viatura : viaturaCreated.id_viatura,
      })

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
      const viaturaManutExists = await ManutencoesModel.findOne({
        where: { id_viatura: id },
      });

      if (viaturaManutExists) {
        return httpHelper.badRequest({
          message:
            "Não é possível deletar uma viatura que possui ao menos uma manutenção",
          variant: "danger",
        });
      }
      
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
      if (filtro != "undefined" && filtro != "") {
        busca = await paginationWhere(ViaturasModel, page, {
          [Op.or]: [
            { marca: { [Op.like]: `%${filtro}%` } },
            { modelo: { [Op.like]: `%${filtro}%` } },
            { chassi: { [Op.like]: `%${filtro}%` } },
            { cor: { [Op.like]: `%${filtro}%` } },
            { orgao_vinculado: { [Op.like]: `%${filtro}%` } },
            { placa: { [Op.like]: `%${filtro}%` } },
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
        quilometragem,
        orgao_vinculado,
        placa,
        piloto,
      } = request.body;

      console.log("id: ", id);
      if (!id) return httpHelper.badRequest("Parâmetros inválidos!");

      const viaturaExists = await ViaturasModel.findOne({ where: {
        id_viatura: id,
      }, });

      if (!viaturaExists) return httpHelper.notFound("Viatura não encontrada!");

      if (bancos > 8) {
        return httpHelper.badRequest({
          message: "A quantidade de bancos não pode ser maior que 8",
          variant: "danger",
        });
      }

      if (portas > 6) {
        return httpHelper.badRequest({
          message: "A quantidade de portas não pode ser maior que 6",
          variant: "danger",
        });
      }

      if (quilometragem >= 1000000 || quilometragem < 0) {
        return httpHelper.badRequest({
          message: "A quilometragem não pode ser maior que 1 milhão nem menor que 0",
          variant: "danger",
        });
      }

      if(quilometragem < viaturaExists.quilometragem) { 
        return httpHelper.badRequest({
          message: "A quilometragem não pode ser menor que a atual",
          variant: "danger",
        });
      }

      if (piloto.length < 3) {
        return httpHelper.badRequest({
          message: "O nome do piloto deve ter pelo menos 3 caracteres",
          variant: "danger",
        });
      }


      await ViaturasModel.update(
        {
          id_viatura: id,
          marca,
          modelo,
          chassi,
          placa: placa.toUpperCase(),
          portas,
          bancos,
          cor,
          quilometragem,
          orgao_vinculado,
          piloto,
        },
        {
          where: {
            id_viatura: id,
          },
        }
      );
      
      const historicoExists = await HistoricoKmModel.findOne({ where: {
        id_viatura: viaturaExists.id_viatura,
      }, });

      if (historicoExists === null) {
        await HistoricoKmModel.create({
          quilometragem: viaturaExists.quilometragem,
          data: new Date(), // Utiliza a data e hora atuais
          id_viatura: id,
        });
      }

      await HistoricoKmModel.create({
        quilometragem,
        data: new Date(),
        id_viatura : id,
      })


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
