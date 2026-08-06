const express = require("express");
const router = express.Router();
const solicitacaoController = require("../controllers/solicitacaoController");
const verificarToken = require("../middleware/auth");

// Todas as rotas de solicitação exigem login (verificarToken)
router.use(verificarToken);

router.post("/", solicitacaoController.criarSolicitacao);
router.get("/minhas", solicitacaoController.listarMinhasSolicitacoes);
router.put("/:id/status", solicitacaoController.atualizarStatus);
router.delete("/:id", solicitacaoController.excluirSolicitacao);

module.exports = router;