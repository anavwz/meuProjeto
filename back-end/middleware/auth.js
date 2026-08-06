const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensagem: "Acesso negado. Token não informado."
        });
    }

    // Garante a extração correta do token após a palavra 'Bearer'
    const partes = authHeader.split(" ");
    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return res.status(401).json({
            mensagem: "Formato de Token inválido. Use o formato: Bearer <token>"
        });
    }

    const token = partes[1];
    const secretKey = process.env.JWT_SECRET || "secreta_padrao_doese";

    try {
        const decoded = jwt.verify(token, secretKey);
        req.usuario = decoded; // Guarda os dados do usuário (id, email) no req
        next();
    } catch (erro) {
        console.error("Erro na verificação do token:", erro.message);
        return res.status(401).json({
            mensagem: "Token inválido ou expirado."
        });
    }
}

module.exports = verificarToken;