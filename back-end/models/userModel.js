const db = require("../config/database");

// 1. Criar novo usuário
function criarUsuario(usuario, callback) {
    const sql = `
        INSERT INTO usuarios
        (nome, email, telefone, cpf, senha, cidade, bairro, endereco, foto_perfil, foto_documento)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        usuario.nome,
        usuario.email,
        usuario.telefone,
        usuario.cpf,
        usuario.senha,
        usuario.cidade,
        usuario.bairro,
        usuario.endereco,
        usuario.foto_perfil,
        usuario.foto_documento
    ], callback);
}

// 2. Verificar duplicidade de E-mail ou CPF no cadastro
function buscarPorEmailOuCpf(email, cpf, callback) {
    const sql = `
        SELECT * FROM usuarios
        WHERE email = ? OR cpf = ?
    `;

    db.query(sql, [email, cpf], callback);
}

// 3. Buscar usuário pelo e-mail (usado no Login)
function buscarPorEmail(email, callback) {
    const sql = `
        SELECT * FROM usuarios
        WHERE email = ?
    `;

    db.query(sql, [email], callback);
}

// 4. Buscar perfil do usuário pelo ID
function buscarPorId(id, callback) {
    const sql = `
        SELECT id, nome, email, telefone, cpf, cidade, bairro, endereco, foto_perfil
        FROM usuarios
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
}

// 5. Atualizar perfil do usuário
function atualizarUsuario(usuario, callback) {
    const sql = `
        UPDATE usuarios
        SET nome = ?, telefone = ?, cidade = ?, bairro = ?, endereco = ?
        WHERE id = ?
    `;

    db.query(sql, [
        usuario.nome,
        usuario.telefone,
        usuario.cidade,
        usuario.bairro,
        usuario.endereco,
        usuario.id
    ], callback);
}

// 6. Excluir conta do usuário
function excluirUsuario(id, callback) {
    const sql = `
        DELETE FROM usuarios
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
}

module.exports = {
    criarUsuario,
    buscarPorEmailOuCpf,
    buscarPorEmail,
    buscarPorId,
    atualizarUsuario,
    excluirUsuario
};