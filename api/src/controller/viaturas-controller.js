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
    const { id } = request.body;
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
    const {
      id,
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

      return response.status(200).json({
        massage: `A Viatura foi atualizada com sucesso`,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }
}

module.exports = { ViaturaController };
