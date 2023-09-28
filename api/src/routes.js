const { Router } = require("express");

const { authMiddleware } = require("./middleware/auth-middleware");
const {
  rateLimitMiddleware,
  rateLimitMiddleware2,
} = require("./middleware/ratelimit-middleware");
const { UsuarioController } = require("./controller/usuario-controller");
const { ViaturaController } = require("./controller/viaturas-controller");
const {
  ManutencoesController,
} = require("./controller/manutencoes-controller");
const { PainelController } = require("./controller/painel-controller");
const { ValidatorController } = require("./controller/validator-controller");

const routes = Router();

const userController = new UsuarioController();
const viaturaController = new ViaturaController();
const manutencoesController = new ManutencoesController();
const usuarioController = new UsuarioController();
const painelController = new PainelController();
const validatorController = new ValidatorController();

routes.post("/login", rateLimitMiddleware2, userController.sigin);
routes.get(
  "/perfil",
  authMiddleware,
  rateLimitMiddleware,
  userController.editarPerfil
);

// Viatura
routes.post(
  "/viatura",
  authMiddleware,
  rateLimitMiddleware,
  viaturaController.criarViatura
);
routes.get(
  "/viaturasBusca",
  authMiddleware,
  rateLimitMiddleware,
  viaturaController.buscarViaturas
);
routes.get(
  "/viaturas",
  authMiddleware,
  rateLimitMiddleware,
  viaturaController.pesquisarViaturas
);
routes.get(
  "/totalViaturas",
  authMiddleware,
  viaturaController.pesquisarTotalViaturas
);
routes.get(
  "/viatura/historico/:id",
  authMiddleware,
  rateLimitMiddleware,
  viaturaController.buscarHistoricoViaturas
);
routes.put(
  "/viatura/:id",
  authMiddleware,
  rateLimitMiddleware,
  viaturaController.atualizarViatura
);
routes.delete(
  "/viatura/:id",
  authMiddleware,
  rateLimitMiddleware,
  viaturaController.deletarViatura
);

// Manutencoes
routes.post(
  "/manutencao",
  authMiddleware,
  rateLimitMiddleware,
  manutencoesController.criarManutencao
);
routes.get(
  "/manutencoesBusca",
  authMiddleware,
  rateLimitMiddleware,
  manutencoesController.buscarManutencoes
);
routes.get(
  "/manutencoes",
  authMiddleware,
  rateLimitMiddleware,
  manutencoesController.pesquisarManutencoes
);
routes.get(
  "/totalManutencoes",
  authMiddleware,
  rateLimitMiddleware,
  manutencoesController.pesquisarTotalManutencoes
);
routes.put(
  "/manutencao/:id",
  authMiddleware,
  rateLimitMiddleware,
  manutencoesController.atualizarManutencao
);
routes.delete(
  "/manutencao/:id",
  authMiddleware,
  rateLimitMiddleware,
  manutencoesController.deletarManutencao
);

// Usuarios

routes.post("/usuario", authMiddleware, usuarioController.criarUsuario);
routes.get("/usuariosBusca", authMiddleware, usuarioController.buscarUsuarios);
routes.get(
  "/usuarios/:page?",
  authMiddleware,
  rateLimitMiddleware,
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
  rateLimitMiddleware,
  usuarioController.pesquisarTotalUsuarios
);
routes.put(
  "/usuario/:id",
  authMiddleware,
  rateLimitMiddleware,
  usuarioController.atualizarUsuario
);
routes.put(
  "/senha/:id",
  authMiddleware,
  rateLimitMiddleware2,
  usuarioController.alterarSenha
);
routes.post(
  "/requestSenha",
  rateLimitMiddleware2,
  usuarioController.esqueceuSenha
);
routes.post(
  "/alterarSenha",
  authMiddleware,
  rateLimitMiddleware,
  usuarioController.alterarEsqueceuSenha
);
routes.delete(
  "/usuario/:id",
  authMiddleware,
  rateLimitMiddleware,
  usuarioController.deletarUsuario
);

// Painel
routes.get(
  "/dashboard",
  authMiddleware,
  rateLimitMiddleware,
  painelController.Dashboard
);
routes.get(
  "/dashboard2/:ano?",
  authMiddleware,
  rateLimitMiddleware,
  painelController.Dashboard2
);
routes.get(
  "/dashboard3",
  authMiddleware,
  rateLimitMiddleware,
  painelController.Dashboard3
);
routes.get(
  "/dashboard4",
  authMiddleware,
  rateLimitMiddleware,
  painelController.Dashboard4
);

routes.get(
  "/dashboard5",
  authMiddleware,
  rateLimitMiddleware,
  painelController.Dashboard5
);

routes.post("/validarToken", validatorController.validaToken);
routes.post(
  "/verify-recaptcha",
  rateLimitMiddleware,
  validatorController.validaRecaptcha
);

module.exports = { routes };
