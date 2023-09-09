const { UsuariosModel } = require("../model/usuarios-model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

class UsuarioController {
  async criarUsuario(request, response) {
    const { matricula, email, unidade, cargo } = request.body;
    try {
      const userExists = await UsuariosModel.findOne({
        where: { matricula },
      });

      if (userExists) {
        return response.status(400).json({
          error: "Usuario já existe!",
        });
      }
      const passwordHashed = await bcrypt.hash(
        '123',
        Number(process.env.SALT)
    );
      const createUser = await UsuariosModel.create({
        matricula,
        senha: passwordHashed,
        email,
        unidade,
        cargo,
      });

      // Gera e retorna o access token
      const accessToken = jwt.sign(
        { id: createUser.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "300m" }
      );

      return response.status(201).json({
        message: "Usuario criado com sucesso!",
        accessToken,
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
      const userExists = await UsuariosModel.findOne({
        where: { matricula },
      });

      if (!userExists) {
        return response.status(400).json({
          error: "Usuario não existe!",
        });
      }

      // Verifica se a senha está correta
      const isPasswordValid = await bcrypt.compare(senha, userExists.senha);

      if (!isPasswordValid) {
        return response.status(400).json({
          error: "Senha incorreta!",
        });
      }

      // Gera e retorna o access token
      const accessToken = jwt.sign(
        { id: userExists.id },
        process.env.TOKEN_SECRET,
        { expiresIn: "300m" }
      );
      return response.status(200).json({ accessToken });
    } catch (error) {
      return response.status(500).json({
        error: `Erro interno: ${error}`,
      });
    }
  }

  async pesquisarUsuarios(request, response) {
    try {
      const filtro = await UsuariosModel.findAll({});

      return response.status(200).json({
        Usuarios: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async atualizarUsuario(request, response) {
    const { id } = request.params;
    const { matricula, senha, email, unidade, cargo } = request.body;

    try {
      await UsuariosModel.update(
        {
          id_usuario: id,
          matricula,
          senha,
          email,
          unidade,
          cargo,
        },
        {
          where: {
            id_usuario: id,
          },
        }
      );

      return response.status(200).json({
        massage: `O usuário foi atualizado com sucesso`,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async deletarUsuario(request, response) {
    const { id } = request.params;
    try {
      await UsuariosModel.destroy({
        where: {
          id_usuario: id,
        },
      });

      return response.status(202).json({
        message: "Usuário deletado com sucesso!",
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }
}

module.exports = { UsuarioController };
