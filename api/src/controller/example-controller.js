const { VendaModel } = require("../model/venda-model");
const { VendaProdutoModel } = require("../model/venda-produto-model");

class VendaController {
  async criarVenda(request, response) {
    const { data, status, id_funcionario, id_produto } = request.body;
    try {
      const cadastrarVenda = await VendaModel.create({
        data: data,
        status: status,
        id_funcionario: id_funcionario,
      });

      if (id_produto[0]) {
        for (const produto of id_produto) {
          await VendaProdutoModel.create({
            id_produto: produto,
            numero: cadastrarVenda.dataValues.numero,
          });
        }
      } else {
        await VendaProdutoModel.create({
          id_produto: id_produto,
          numero: cadastrarVenda.dataValues.numero,
        });
      }

      return response.status(201).json({
        message: "Venda cadastrada com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async deletarVenda(request, response) {
    const { numero } = request.body;
    try {
      await VendaModel.destroy({
        where: {
          numero: numero,
        },
      });

      return response.status(202).json({
        message: "Venda deletada com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarVenda(request, response) {
    const { numero } = request.body;

    try {
      const filtro = await VendaModel.findAll({
        where: {
          numero: numero,
        },
      });

      return response.status(200).json({
        Vendas: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarVendas(request, response) {
    try {
      const filtro = await VendaModel.findAll({});

      return response.status(200).json({
        Vendas: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async atualizarVenda(request, response) {
    const { id, descricao, preco, marca, data_vencimento, tipo } = request.body;

    try {
      await VendaModel.update(
        {
          descricao: descricao,
          preco: preco,
          marca: marca,
          data_vencimento: data_vencimento,
          tipo: tipo,
        },
        {
          where: {
            id_Venda: id,
          },
        }
      );

      return response.status(200).json({
        massage: `A Venda foi atualizada com sucesso`,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }
}

module.exports = { VendaController };
