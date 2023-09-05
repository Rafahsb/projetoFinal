const { UsuarioModel } = require("../model/usuario-model");
const jwt = require("jsonwebtoken");

class UsuarioController {
  async criarUsuario(request, response) {
    const { matricula, senha } = request.body;
    try {
      await UsuarioModel.create({
        matricula: matricula,
        senha: senha,
      });

      return response.status(201).json({
        message: "Usuario criado com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async sigin(request, response) {
    try {
      const { matricula, senha } = request.body;

      // Validar parâmetros
      if (!matricula || !senha) {
        return response.status(400).json({
          error: "Nome e senha são obrigatórios!",
        });
      }

      // Verifica se usuário existe
      const userExists = await UsuarioModel.findOne({
        where: { matricula },
      });

      if (!userExists) {
        return response.status(400).json({
          error: "Usuario não existe!",
        });
      }

      // Verifica se a senha está correta

      if (senha != userExists.senha) {
        return response.status(400).json({
          error: "Senha incorreta!",
        });
      }

      // Gera e retorna o access token
      const accessToken = jwt.sign(
        { id: userExists.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "30m" }
      );

      return response.status(200).json({ accessToken });
    } catch (error) {
      return response.status(500).json({
        error: `Erro interno: ${error}`,
      });
    }
  }
}

module.exports = { UsuarioController };
