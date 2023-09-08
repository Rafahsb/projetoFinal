const { ManutencoesModel } = require("../model/manutencoes-model");

class ManutencoesController {
  async criarManutencao(request, response) {
    console.log("teste2",request);
    const { numero_nota, descricao, preco, data, id_viatura } = request.body;
    try {
      await ManutencoesModel.create({
        numero_nota,
        descricao,
        preco,
        data_nota: data,
        id_viatura
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

  async atualizarManutencao(request, response) {
    const { id, numero_nota, descricao, preco, data, id_viatura } = request.body;

    try {
      await ManutencoesModel.update(
        {
          id_manutencao: id,
          numero_nota,
          descricao,
          preco,
          data_nota: data,
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
