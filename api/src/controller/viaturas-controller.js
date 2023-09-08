const { HttpHelper } = require('../utils/http-helper');

const { ViaturasModel } = require("../model/viaturas-model");

class ViaturaController {
  async criarViatura(request, response) {
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

      return response.status(201).json({
        message: "Viatura cadastrada com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async deletarViatura(request, response) {
    const { id } = request.params;
    try {
      await ViaturasModel.destroy({
        where: {
          id_viatura: id,
        },
      });

      return response.status(202).json({
        message: "Viatura deletada com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarViatura(request, response) {
    const { id } = request.body;

    try {
      const filtro = await ViaturasModel.findAll({
        where: {
          id_viatura: id,
        },
      });

      return response.status(200).json({
        Viaturas: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarViaturas(request, response) {
    try {
      const filtro = await ViaturasModel.findAll({});

      return response.status(200).json({
        Viaturas: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
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
      if (!id) return httpHelper.badRequest('Parâmetros inválidos!');
      
      const viaturaExists = await ViaturasModel.findOne({id_viatura:id});
      
      if(!viaturaExists) return httpHelper.notFound('Viatura não encontrada!');

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
        message: 'Viatura atualizada com sucesso!'
    });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { ViaturaController };
