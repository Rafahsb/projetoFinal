const { HttpHelper } = require("../utils/http-helper");
const { Op, where } = require("sequelize");
const { ViaturasModel } = require("../model/viaturas-model");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { HistoricoKmModel } = require("../model/historico-km-model");
const { paginationWhere } = require("../utils/paginationWhere");
const { Validates } = require("../utils/validates");
const { Sequelize } = require("sequelize");
const ExcelJS = require("exceljs");

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
      lat,
      long,
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
      !piloto ||
      !status
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
        status: "garagem",
        lat,
        long,
      });

      await HistoricoKmModel.create({
        quilometragem,
        data: new Date(),
        id_viatura: viaturaCreated.id_viatura,
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

  async buscarHistoricoViaturas(request, response) {
    const httpHelper = new HttpHelper(response);

    try {
      const { id } = request.params;

      const historicoExists = await HistoricoKmModel.sequelize.query(
        `SELECT hk.quilometragem, data, marca, modelo, 
        chassi, placa, portas, bancos, cor, orgao_vinculado, piloto 
        FROM "historicoKm" as hk INNER JOIN viaturas as v ON hk.id_viatura = v.id_viatura
        WHERE hk.id_viatura = ${id}`,
        {
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      if (!id)
        return httpHelper.badRequest({
          message: "Parâmetros inválidos!",
          variant: "danger",
        });

      // Crie uma nova planilha Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Dados");

      // Adicione os cabeçalhos da tabela
      worksheet.columns = [
        { header: "Quilometragem", key: "quilometragem", width: 15 },
        { header: "Data", key: "data", width: 20 },
        { header: "Marca", key: "marca", width: 20 },
        { header: "Modelo", key: "modelo", width: 20 },
        { header: "Chassi", key: "chassi", width: 20 },
        { header: "Placa", key: "placa", width: 20 },
        { header: "Portas", key: "portas", width: 20 },
        { header: "Bancos", key: "bancos", width: 20 },
        { header: "Cor", key: "cor", width: 20 },
        { header: "Órgão Vinculado", key: "orgao_vinculado", width: 20 },
      ];

      // Preencha a planilha com os dados
      historicoExists.forEach((row) => {
        const formattedDate = Validates.formatDate(row.data);
        const newRow = {
          quilometragem: row.quilometragem,
          data: formattedDate,
          marca: row.marca,
          modelo: row.modelo,
          chassi: row.chassi,
          placa: row.placa,
          portas: row.portas,
          bancos: row.bancos,
          cor: row.cor,
          orgao_vinculado: row.orgao_vinculado,
        };
        worksheet.addRow(newRow);
      });

      // Defina o tipo de conteúdo da resposta para XLSX

      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      response.setHeader(
        "Content-Disposition",
        "attachment; filename=dados.xlsx"
      );

      const buffer = await workbook.xlsx.writeBuffer();
      const base64Data = Buffer.from(buffer).toString("base64");

      // Finalize a resposta
      return httpHelper.ok({ message: "Planilha enviada!", data: base64Data });
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
        status,
        lat,
        long,
      } = request.body;

      if (!id)
        return httpHelper.badRequest({
          message: "Parâmetros inválidos!",
          variant: "danger",
        });

      const viaturaExists = await ViaturasModel.findOne({
        where: {
          id_viatura: id,
        },
      });

      if (status !== "manutencao") {
        const manutencaoExists = await ManutencoesModel.sequelize.query(`
        SELECT * FROM viaturas INNER JOIN manutencoes ON manutencoes.id_viatura = viaturas.id_viatura
        WHERE viaturas.id_viatura =  ${id} and data_nota isNull
        order by id_manutencao desc
        limit 1;
        `);

        if (manutencaoExists[0][0] != undefined) {
          return httpHelper.badRequest({
            message:
              "Status inválido! A viatura possui uma manutenção cadastrada sem a data final.",
            variant: "danger",
          });
        }
      }

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
          message:
            "A quilometragem não pode ser maior que 1 milhão nem menor que 0",
          variant: "danger",
        });
      }

      if (quilometragem < viaturaExists.quilometragem) {
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
          status,
        },
        {
          where: {
            id_viatura: id,
          },
        }
      );

      const historicoExists = await HistoricoKmModel.findOne({
        where: {
          id_viatura: viaturaExists.id_viatura,
        },
      });

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
        id_viatura: id,
      });

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
