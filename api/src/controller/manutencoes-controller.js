const { Sequelize } = require("sequelize");
const { ManutencoesModel } = require("../model/manutencoes-model");
const { ViaturasModel } = require("../model/viaturas-model");
const { Validates } = require('../utils/validates');
const { format } = require("date-fns");
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');

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
    const { id } = request.params;
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

  async buscarManutencoes(request, response) {
    console.log(request.params);
    let busca;
    const { filtro } = request.params || null;

    try {
      if (filtro != null) {
        busca = await ManutencoesModel.findAll({
          where: {
            [Op.or]: [
              { numero_nota: { [Op.like]: `%${filtro}%` } },
              { descricao: { [Op.like]: `%${filtro}%` } },
              { preco: parseFloat(filtro) },
            ],
          },
        });
      } else {
        busca = await ManutencoesModel.findAll({});
      }
      
      busca.forEach((manutencao) => {
        manutencao.dataValues.data_nota = Validates.formatDate(manutencao.dataValues.data_nota);
        // manutencao.dataValues.data_nota = format(new Date(manutencao.dataValues.data_nota), "dd/MM/yyyy")
      });

      return response.status(200).json({
        Manutencoes: busca,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarTotalManutencoes(request, response) {
    try {
      const total = await ManutencoesModel.count()
      return response.status(200).json({
        Total: total,
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
