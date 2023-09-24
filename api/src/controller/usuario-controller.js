const { UsuariosModel } = require("../model/usuarios-model");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { HttpHelper } = require("../utils/http-helper");
const { paginationWhere } = require("../utils/paginationWhere");
const nodemailer = require("nodemailer");

const itensPorPagina = 5;
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

class UsuarioController {
  async esqueceuSenha(request, response) {
    const httpHelper = new HttpHelper(response);
    const { matricula } = request.body;

    try {
      const userExists = await UsuariosModel.findOne({
        where: { matricula },
      });

      if (!userExists) {
        return httpHelper.badRequest({
          message: "Usuário não encontrado!",
          variant: "danger",
        });
      }

      const accessToken = jwt.sign(
        { id: userExists.id_usuario },
        process.env.TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const resetLink = `http://localhost:3000/alterarSenha?token=${accessToken}`;

      const mailOptions = {
        from: "viagestaoreset@gmail.com",
        to: userExists.email,
        subject: "Redefinir senha - ViaGestão",
        text: `Clique no link a seguir para redefinir sua senha: ${resetLink}. Expira em 15 minutos!.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return httpHelper.internalError("Erro ao enviar o email");
        } else {
          return httpHelper.ok({
            message: "Email enviado com sucesso",
            variant: "success",
          });
        }
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async alterarEsqueceuSenha(request, response) {
    const httpHelper = new HttpHelper(response);
    const { token, nova_senha, confirmar_nova_senha } = request.body;

    try {
      const dadosUsuario = jwt.verify(
        token.replace(/"/g, ""),
        process.env.TOKEN_SECRET
      );

      if (!dadosUsuario.id) {
        return httpHelper.internalError("Token expirado ou inválido!");
      }

      if (confirmar_nova_senha !== nova_senha) {
        return httpHelper.badRequest({
          message:
            "A nova senha informada não bate com a confirmação da nova senha!",
        });
      }

      const passwordHashed = await bcrypt.hash(
        nova_senha,
        Number(process.env.SALT)
      );

      const result = await UsuariosModel.update(
        {
          senha: passwordHashed,
        },
        {
          where: {
            id_usuario: dadosUsuario.id,
          },
        }
      );

      return httpHelper.ok({
        message: "Senha alterada com sucesso!",
        variant: "success",
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async criarUsuario(request, response) {
    const httpHelper = new HttpHelper(response);
    const { matricula, nome, email, unidade, cargo } = request.body;
    try {
      if (!matricula || !nome || !email || !unidade || !cargo) {
        return httpHelper.badRequest({
          message: "Ops! faltou preencher algum campo!",
          variant: "danger",
        });
      }

      const userExists = await UsuariosModel.findOne({
        where: { matricula },
      });

      if (userExists) {
        return httpHelper.badRequest({
          message: "Já existe um usuário com a matrícula cadastrada!",
          variant: "danger",
        });
      }

      const passwordHashed = await bcrypt.hash("123", Number(process.env.SALT));
      const createUser = await UsuariosModel.create({
        matricula,
        nome,
        senha: passwordHashed,
        email,
        unidade,
        cargo,
      });

      return httpHelper.created({
        message: "Usuario criado com sucesso!",
        variant: "success",
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async sigin(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const { matricula, senha } = request.body;

      // Validar parâmetros
      if (!matricula || !senha) {
        return httpHelper.badRequest({message: "Nome e senha são obrigatórios!"});
      }

      // Verifica se usuário existe
      const userExists = await UsuariosModel.findOne({
        where: { matricula },
      });
      if (!userExists) {
        return httpHelper.badRequest({message:"Usuario não existe!"});
      }

      const isPasswordValid = await bcrypt.compare(senha, userExists.senha);

      if (!isPasswordValid) {
        return httpHelper.badRequest({
          message: "Senha incorreta!"
        })
        
      }

      // Gera e retorna o access token
      const accessToken = jwt.sign(
        { id: userExists.id_usuario },
        process.env.TOKEN_SECRET,
        { expiresIn: "300m" }
      );

      return httpHelper.ok({ accessToken });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async buscarUsuarios(request, response) {
    const httpHelper = new HttpHelper(response);
    let busca;
    const { filtro, page } = request.query || null;

    try {
      if (filtro != "undefined") {
        busca = await paginationWhere(
          UsuariosModel,
          page,
          {
            [Op.or]: [
              { matricula: { [Op.like]: `%${filtro}%` } },
              { nome: { [Op.like]: `%${filtro}%` } },
              { email: { [Op.like]: `%${filtro}%` } },
              { unidade: { [Op.like]: `%${filtro}%` } },
              { cargo: { [Op.like]: `%${filtro}%` } },
            ],
          },
          ["id_usuario", "matricula", "nome", "email", "unidade", "cargo"]
        );
      } else {
        busca = await paginationWhere(UsuariosModel, page, "", [
          "id_usuario",
          "matricula",
          "nome",
          "email",
          "unidade",
          "cargo",
        ]);
      }

      return httpHelper.ok({ Usuarios: busca.data, TotalPages: busca.pages });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async pesquisarTotalUsuarios(request, response) {
    const httpHelper = new HttpHelper(response);
    try {
      const total = await UsuariosModel.count();

      return httpHelper.ok({ Total: total });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async pesquisarUsuarios(request, response) {
    const httpHelper = new HttpHelper(response);
    const { page } = request.params;

    const offset = (page - 1) * itensPorPagina;

    const totalElements = await UsuariosModel.count();

    const totalPages = Math.ceil(totalElements / itensPorPagina);

    try {
      const filtro = await UsuariosModel.findAll({
        offset,
        limit: itensPorPagina,
        attributes: [
          "matricula",
          "nome",
          "email",
          "unidade",
          "cargo",
          "id_usuario",
        ],
      });

      return httpHelper.ok({
        Usuarios: filtro,
        totalpages: totalPages,
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async alterarSenha(request, response) {
    const httpHelper = new HttpHelper(response);
    const { id } = request.params;
    const { senha, nova_senha, confirmar_nova_senha } = request.body;

    try {
      const userExists = await UsuariosModel.findOne({
        where: { id_usuario: id },
      });

      const isPasswordValid = await bcrypt.compare(senha, userExists.senha);

      if (!isPasswordValid) {
        return httpHelper.badRequest({
          message: "Senha incorreta!",
          variant: "danger",
        });
      }

      if (confirmar_nova_senha !== nova_senha) {
        return httpHelper.badRequest({
          message:
            "A nova senha informada não bate com a confirmação da nova senha!",
          variant: "danger",
        });
      }

      const passwordHashed = await bcrypt.hash(
        nova_senha,
        Number(process.env.SALT)
      );

      await UsuariosModel.update(
        {
          senha: passwordHashed,
        },
        {
          where: {
            id_usuario: id,
          },
        }
      );

      return httpHelper.ok({
        message: "Senha alterada com sucesso",
        variant: "success",
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async pesquisarUsuario(request, response) {
    const httpHelper = new HttpHelper(response);
    const { token } = request.params;

    const dadosUsuario = jwt.verify(
      token.replace(/"/g, ""),
      process.env.TOKEN_SECRET
    );

    if (!dadosUsuario.id) {
      return httpHelper.badRequest({
        message: "Token inválido!",
        variant: "danger",
      });
    }
    try {
      const filtro = await UsuariosModel.findOne({
        attributes: ["matricula", "email", "unidade", "cargo", "id_usuario"],
        where: { id_usuario: dadosUsuario.id },
      });

      return httpHelper.ok({ Usuario: filtro });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async editarPerfil(request, response) {
    const httpHelper = new HttpHelper(response);
    const { id } = request.params;
    const { matricula, nome, email, unidade, cargo } = request.body;

    try {
      await UsuariosModel.update(
        {
          id_usuario: id,
          nome,
          matricula,
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

      return httpHelper.ok({
        message: `O usuário foi atualizado com sucesso`,
        variant: "success",
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async atualizarUsuario(request, response) {
    const httpHelper = new HttpHelper(response);
    const { id } = request.params;
    const { matricula, nome, senha, email, unidade, cargo } = request.body;

    try {
      await UsuariosModel.update(
        {
          id_usuario: id,
          nome,
          matricula,
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

      return httpHelper.ok({
        message: `O usuário foi atualizado com sucesso`,
        variant: "success",
      });
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async deletarUsuario(request, response) {
    const httpHelper = new HttpHelper(response);
    const { id } = request.params;
    try {
      await UsuariosModel.destroy({
        where: {
          id_usuario: id,
        },
      });

      return httpHelper.noContent();
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { UsuarioController };
