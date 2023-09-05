const { Router } = require("express");

const { authMiddleware } = require("./middleware/auth-middleware");
const { UsuarioController } = require("./controller/usuario-controller");
const routes = Router();

const userController = new UsuarioController();

routes.post("/register", userController.criarUsuario);
routes.post("/login", userController.sigin);
// venda

module.exports = { routes };
