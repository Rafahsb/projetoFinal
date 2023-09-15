const { Router } = require("express");

const { authMiddleware } = require("./middleware/auth-middleware");
const { UsuarioController } = require("./controller/usuario-controller");
const { ViaturaController } = require("./controller/viaturas-controller");
const {
  ManutencoesController,
} = require("./controller/manutencoes-controller");
const { PainelController } = require("./controller/painel-controller");

const routes = Router();

const userController = new UsuarioController();
const viaturaController = new ViaturaController();
const manutencoesController = new ManutencoesController();
const usuarioController = new UsuarioController();
const painelController = new PainelController();

routes.post("/login", userController.sigin);
routes.get("/perfil", authMiddleware, userController.editarPerfil);

// Viatura
routes.post("/viatura", authMiddleware, viaturaController.criarViatura);
routes.get("/viaturasBusca", authMiddleware, viaturaController.buscarViaturas);
routes.get("/viaturas", authMiddleware, viaturaController.pesquisarViaturas);
routes.get(
  "/totalViaturas",
  authMiddleware,
  viaturaController.pesquisarTotalViaturas
);
routes.put("/viatura/:id", authMiddleware, viaturaController.atualizarViatura);
routes.delete("/viatura/:id", authMiddleware, viaturaController.deletarViatura);

// Manutencoes
routes.post(
  "/manutencao",
  authMiddleware,
  manutencoesController.criarManutencao
);
routes.get(
  "/manutencoesBusca",
  authMiddleware,
  manutencoesController.buscarManutencoes
);
routes.get(
  "/manutencoes",
  authMiddleware,
  manutencoesController.pesquisarManutencoes
);
routes.get(
  "/totalManutencoes",
  authMiddleware,
  manutencoesController.pesquisarTotalManutencoes
);
routes.put(
  "/manutencao/:id",
  authMiddleware,
  manutencoesController.atualizarManutencao
);
routes.delete(
  "/manutencao/:id",
  authMiddleware,
  manutencoesController.deletarManutencao
);

// Usuarios

routes.post("/usuario", authMiddleware, usuarioController.criarUsuario);
routes.get("/usuariosBusca", authMiddleware, usuarioController.buscarUsuarios);
routes.get(
  "/usuarios/:page?",
  authMiddleware,
  usuarioController.pesquisarUsuarios
);
routes.get(
  "/usuario/:token",
  authMiddleware,
  usuarioController.pesquisarUsuario
);
routes.get(
  "/totalUsuarios",
  authMiddleware,
  usuarioController.pesquisarTotalUsuarios
);
routes.put("/usuario/:id", authMiddleware, usuarioController.atualizarUsuario);
routes.put("/senha/:id", authMiddleware, usuarioController.alterarSenha);
routes.delete("/usuario/:id", authMiddleware, usuarioController.deletarUsuario);

// Painel

routes.get("/dashboard", authMiddleware, painelController.Dashboard);

module.exports = { routes };
