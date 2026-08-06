const db = require("../config/database");

// 1. Criar novo item de doação
function criarItem(item, callback) {
    const sql = `
        INSERT INTO itens
        (titulo, descricao, categoria_id, estado, imagens_itens, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        item.titulo,
        item.descricao,
        item.categoria_id,
        item.estado,
        item.imagens_itens,
        item.usuario_id
    ], callback);
}

// 2. Listar todos os itens cadastrados
function listarItens(callback) {
    const sql = `
        SELECT
            i.*,
            u.nome AS nome_doador,
            u.cidade,
            u.bairro,
            c.nome AS categoria
        FROM itens i
        JOIN usuarios u ON i.usuario_id = u.id
        LEFT JOIN categorias c ON i.categoria_id = c.id
        ORDER BY i.id DESC
    `;

    db.query(sql, callback);
}

// 3. Atualizar dados do item
function atualizarItem(item, callback) {
    const sql = `
        UPDATE itens
        SET titulo = ?, descricao = ?, categoria_id = ?, estado = ?
        WHERE id = ? AND usuario_id = ?
    `;

    db.query(sql, [
        item.titulo,
        item.descricao,
        item.categoria_id,
        item.estado,
        item.id,
        item.usuario_id
    ], callback);
}

// 4. Excluir item
function excluirItem(id, usuario_id, callback) {
    const sql = `
        DELETE FROM itens
        WHERE id = ? AND usuario_id = ?
    `;

    db.query(sql, [id, usuario_id], callback);
}

module.exports = {
    criarItem,
    listarItens,
    atualizarItem,
    excluirItem
};