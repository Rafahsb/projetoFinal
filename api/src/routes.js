const { Router } = require("express");

const { authMiddleware } = require("./middleware/auth-middleware");
const { UsuarioController } = require("./controller/usuario-controller");
const { ViaturaController } = require("./controller/viaturas-controller");
const routes = Router();

const userController = new UsuarioController();
const viaturaController = new ViaturaController();

routes.post("/register", userController.criarUsuario);
routes.post("/login", userController.sigin);

routes.post("/viatura", viaturaController.criarViatura);
routes.get("/viaturas", viaturaController.pesquisarViaturas);
routes.put("/viatura/:id", viaturaController.atualizarViatura);
routes.delete("/viatura/:id", viaturaController.deletarViatura);
// venda

module.exports = { routes };
