const jwt = require("jsonwebtoken");
const { HttpHelper } = require("../utils/http-helper");

function authMiddleware(request, response, next) {
  const httpHelper = new HttpHelper(response);
  try {
    const token = request.headers.authorization;
    if (token) {
      const accessToken = token.split(" ")[1];
      jwt.verify(accessToken, process.env.TOKEN_SECRET, (error, user) => {
        if (error) {
          return httpHelper.unauthorized();
        }
        request.params.userId = user.id;
        if (user.cargo === "Admin") {
          // Permita que o usuário admin acesse todas as rotas
          next();
        } else if (user.cargo === "Usuario" && request.method === "GET") {
          // Permita que o usuário usuário acesse apenas as requisições GET
          next();
        } else {
          return httpHelper.forbidden("Usuário não autorizado!");
        }
      });
    } else {
      return httpHelper.unauthorized();
    }
  } catch (error) {
    return httpHelper.internalError(error);
  }
}

module.exports = { authMiddleware };
