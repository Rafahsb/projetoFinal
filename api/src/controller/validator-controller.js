const { HttpHelper } = require("../utils/http-helper");
const jwt = require("jsonwebtoken");
class ValidatorController {
  validaToken(request, response) {
    const httpHelper = new HttpHelper(response);
    const { token } = request.body;
    try {
      const dadosUsuario = jwt.verify(
        token.replace(/"/g, ""),
        process.env.TOKEN_SECRET
      );

      return httpHelper.ok("Token válido");
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { ValidatorController };
