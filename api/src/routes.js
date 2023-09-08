const { Router } = require("express");

const { authMiddleware } = require("./middleware/auth-middleware");
const { UsuarioController } = require("./controller/usuario-controller");
const { ViaturaController } = require("./controller/viaturas-controller");
const { ManutencoesController } = require("./controller/manutencoes-controller");
const routes = Router();

const userController = new UsuarioController();
const viaturaController = new ViaturaController();
const manutencoesController = new ManutencoesController();

routes.post("/login", userController.sigin);
routes.post("/register", userController.criarUsuario);

// Viatura
routes.post("/viatura", viaturaController.criarViatura);
routes.get("/viaturas", viaturaController.pesquisarViaturas);
routes.put("/viatura/:id", viaturaController.atualizarViatura);
routes.delete("/viatura/:id", viaturaController.deletarViatura);

// Manutencoes
routes.post("/manutencao", manutencoesController.criarManutencao);
routes.get("/manutencoes", manutencoesController.pesquisarManutencoes);
routes.put("/manutencao/:id", manutencoesController.atualizarManutencao);
routes.delete("/manutencao/:id", manutencoesController.deletarManutencao);

// Usuarios



module.exports = { routes };
