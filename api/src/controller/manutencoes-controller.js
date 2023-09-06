const { ManutencoesModel } = require("../model/manutencoes-model");

class ManutencoesController {
  async criarManutencoes(request, response) {
    const { numero_nota, descricao, preco, data } = request.body;
    try {
      await ManutencoesModel.create({
        numero_nota,
        descricao,
        preco,
        data,
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

  async deletarManutencoes(request, response) {
    const { id } = request.body;
    try {
      await ManutencoesModel.destroy({
        where: {
          id_Manutencoes: id,
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

      return response.status(200).json({
        Manutencoes: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async atualizarManutencoes(request, response) {
    const { id, numero_nota, descricao, preco, data } = request.body;

    try {
      await ManutencoesModel.update(
        {
          id_manutencao: id,
          numero_nota,
          descricao,
          preco,
          data,
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
