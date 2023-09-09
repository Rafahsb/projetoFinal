const { Sequelize } = require("sequelize");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { ViaturasModel } = require("../model/viaturas-model");
const { Validates } = require('../utils/validates');
const { format } = require("date-fns");

class ManutencoesController {
  async criarManutencao(request, response) {
    const { numero_nota, descricao, preco, data, id_viatura } = request.body;
    try {
      await ManutencoesModel.create({
        numero_nota,
        descricao,
        preco,
        data_nota: data,
        id_viatura,
      });

      return response.status(201).json({
        message: "Manutencoes cadastrada com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async deletarManutencao(request, response) {
    console.log(request);
    const { id } = request.params;
    console.log('id', id);
    try {
      await ManutencoesModel.destroy({
        where: {
          id_manutencao: id,
        },
      });

      return response.status(202).json({
        message: "Manutencoes deletada com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarManutencao(request, response) {
    const { id } = request.body;

    try {
      const filtro = await ManutencoesModel.findAll({
        where: {
          id_manutencao: id,
        },
      });

      return response.status(200).json({
        Manutencoes: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarManutencoes(request, response) {
    try {
      const filtro = await ManutencoesModel.findAll({});


      filtro.forEach((manutencao) => {
        manutencao.dataValues.data_nota = Validates.formatDate(manutencao.dataValues.data_nota);
        // manutencao.dataValues.data_nota = format(new Date(manutencao.dataValues.data_nota), "dd/MM/yyyy")
      });

      return response.status(200).json({
        Manutencoes: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async atualizarManutencao(request, response) {
    const { id } = request.params;
    const { numero_nota, descricao, preco, data_nota, id_viatura } = request.body;

    try {
      await ManutencoesModel.update(
        {
          numero_nota,
          descricao,
          preco,
          data_nota,
          id_viatura
        },
        {
          where: {
            id_manutencao: id,
          },
        }
      );

      return response.status(200).json({
        massage: `A Manutencoes foi atualizada com sucesso`,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }
}

module.exports = { ManutencoesController };
