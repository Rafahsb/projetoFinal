const { HttpHelper } = require("../utils/http-helper");
const jwt = require("jsonwebtoken");
const axios = require("axios");
class ValidatorController {
  validaToken(request, response) {
    const httpHelper = new HttpHelper(response);
    const { token } = request.body;
    try {
      const dadosUsuario = jwt.verify(
        token.replace(/"/g, ""),
        process.env.TOKEN_SECRET
      );
      console.log("dados: ", dadosUsuario);
      return httpHelper.ok("Token válido");
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }

  async validaRecaptcha(request, response) {
    const httpHelper = new HttpHelper(response);
    const { recaptchaToken } = request.body;
    const secretKey = process.env.TOKEN_RECAPTCHA;
    try {
      const reCaptchaResponse = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        {
          params: {
            secret: secretKey,
            response: recaptchaToken,
          },
        }
      );

      if (reCaptchaResponse.data.success) {
        httpHelper.ok({ message: "reCAPTCHA verificado com sucesso" });
      } else {
        return httpHelper.badRequest({
          message: "Ops! Captcha incorreto!",
          variant: "danger",
        });
      }
    } catch (error) {
      return httpHelper.internalError(error);
    }
  }
}

module.exports = { ValidatorController };
