const { Router } = require("express");

const { authMiddleware } = require("./middleware/auth-middleware");
const { UsuarioController } = require("./controller/usuario-controller");
const { ViaturaController } = require("./controller/viaturas-controller");
const { ManutencoesController } = require("./controller/manutencoes-controller");

const routes = Router();

const userController = new UsuarioController();
const viaturaController = new ViaturaController();
const manutencoesController = new ManutencoesController();
const usuarioController = new UsuarioController();
routes.post("/login", userController.sigin);

// Viatura
routes.post("/viatura", authMiddleware, viaturaController.criarViatura);
routes.get("/viaturas", authMiddleware, viaturaController.pesquisarViaturas);
routes.put("/viatura/:id", authMiddleware, viaturaController.atualizarViatura);
routes.delete("/viatura/:id", authMiddleware, viaturaController.deletarViatura);

// Manutencoes
routes.post("/manutencao", authMiddleware, manutencoesController.criarManutencao);
routes.get("/manutencoes", authMiddleware, manutencoesController.pesquisarManutencoes);
routes.put("/manutencao/:id", authMiddleware, manutencoesController.atualizarManutencao);
routes.delete("/manutencao/:id", authMiddleware, manutencoesController.deletarManutencao);

routes.post("/usuario", authMiddleware, usuarioController.criarUsuario);
routes.get("/usuarios", authMiddleware, usuarioController.pesquisarUsuarios);
routes.put("/usuario/:id", authMiddleware, usuarioController.atualizarUsuario);
routes.delete("/usuario/:id", authMiddleware, usuarioController.deletarUsuario);

// Usuarios



module.exports = { routes };
