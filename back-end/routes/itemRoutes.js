const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const verificarToken = require("../middleware/auth");
const upload = require("../middleware/upload"); // Caso use multer para imagens

// Rota pública para listar todos os itens na tela principal
router.get("/", itemController.listarItens);

// Rotas protegidas (precisa estar logado)
router.post("/", verificarToken, upload.single("imagem"), itemController.criarItem);
router.put("/:id", verificarToken, itemController.atualizarItem);
router.delete("/:id", verificarToken, itemController.excluirItem);

module.exports = router;