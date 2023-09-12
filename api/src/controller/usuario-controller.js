const { UsuariosModel } = require("../model/usuarios-model");
const { Op } = require('sequelize');
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
      // const isPasswordValid = await bcrypt.compare(senha, userExists.senha);

      // if (!isPasswordValid) {
      //   return response.status(400).json({
      //     error: "Senha incorreta!",
      //   });
      // }
        
        
      // Gera e retorna o access token
      const accessToken = jwt.sign(
        { id: userExists.id_usuario },
        process.env.TOKEN_SECRET,
        { expiresIn: "300m" }
      );
      return response.status(200).json({ accessToken, id: userExists.id_usuario });
    } catch (error) {
      return response.status(500).json({
        error: `Erro interno: ${error}`,
      });
    }
  }

  async buscarUsuarios(request, response) {
    let busca;
    const { filtro } =  request.params || null;
    try {
      if (filtro != null) {
        busca = await UsuariosModel.findAll({
          where: {
            [Op.or]: [
              { matricula: { [Op.like]: `%${filtro}%` } },
              { email: { [Op.like]: `%${filtro}%` } },
              { unidade: { [Op.like]: `%${filtro}%` } },
              { cargo: { [Op.like]: `%${filtro}%` } },
            ],
          },
          attributes: ['matricula',
          'email',
          'unidade',
          'cargo',
          'id_usuario']
        });
      } else {
        busca = await UsuariosModel.findAll({
          attributes: ['matricula',
          'email',
          'unidade',
          'cargo',
          'id_usuario']
        });
      }
      
      return response.status(200).json({
        Usuarios: busca,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarTotalUsuarios(request, response) {
    try {
      const total = await UsuariosModel.count()
      return response.status(200).json({
        Total: total,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarUsuarios(request, response) {
    try {
      const filtro = await UsuariosModel.findAll({
        attributes: ['matricula',
          'email',
          'unidade',
          'cargo',
        'id_usuario']
      });

      return response.status(200).json({
        Usuarios: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async pesquisarUsuario(request, response) {
    console.log("request: " + request.params);
    const { token } = request.params;
    const dadosUsuario = jwt.verify(token.replace(/"/g, ''), process.env.TOKEN_SECRET);

    try {
      const filtro = await UsuariosModel.findOne({
        attributes: ['matricula',
          'email',
          'unidade',
          'cargo',
          'id_usuario'],
        where: { id_usuario:  dadosUsuario.id },
      });

      return response.status(200).json({
        Usuario: filtro,
      });
    } catch (error) {
      return response.status(400).json({
        message: `Erro: ${error}`,
      });
    }
  }

  async editarPerfil(request, response) {
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
