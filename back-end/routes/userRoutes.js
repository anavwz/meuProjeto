const express = require("express");
const router = express.Router();

// Importa o controller onde estão as funções de usuário
const userController = require("../controllers/userController");

// Importa o middleware que verifica se o usuário está logado (JWT)
const verificarToken = require("../middleware/auth");

// ==========================================
// ROTAS PÚBLICAS (NÃO precisam de login)
// ==========================================

// Rota de Cadastro: POST http://localhost:3000/api/usuarios/cadastro
router.post("/cadastro", userController.cadastrarUsuario);

// Rota de Login: POST http://localhost:3000/api/usuarios/login
router.post("/login", userController.loginUsuario);


// ==========================================
// ROTAS PROTEGIDAS (Exigem o Token JWT)
// ==========================================

// Buscar Perfil: GET http://localhost:3000/api/usuarios/perfil
router.get(
    "/perfil",
    verificarToken,
    userController.buscarPerfil
);

// Atualizar Perfil: PUT http://localhost:3000/api/usuarios/perfil
router.put(
    "/perfil",
    verificarToken,
    userController.atualizarPerfil
);

// Excluir Perfil: DELETE http://localhost:3000/api/usuarios/perfil
router.delete(
    "/perfil",
    verificarToken,
    userController.excluirPerfil
);

module.exports = router;