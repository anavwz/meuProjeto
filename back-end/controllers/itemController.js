const itemModel = require("../models/itemModel");

// 1. Criar item de doação
exports.criarItem = (req, res) => {
    const { titulo, descricao, categoria_id, estado, cidade, bairro } = req.body;

    if (!titulo || !descricao || !categoria_id || !estado) {
        return res.status(400).json({
            mensagem: "Preencha os campos obrigatórios: título, descrição, categoria e estado."
        });
    }

    const item = {
        titulo,
        descricao,
        categoria_id,
        estado,
        cidade: cidade || req.usuario?.cidade || "",
        bairro: bairro || req.usuario?.bairro || "",
        imagens_itens: req.file ? req.file.filename : null,
        usuario_id: req.usuario.id
    };

    itemModel.criarItem(item, (err, result) => {
        if (err) {
            console.error("Erro ao criar item:", err);
            return res.status(500).json({
                mensagem: "Erro ao cadastrar item."
            });
        }

        return res.status(201).json({
            mensagem: "Item cadastrado com sucesso!",
            itemId: result?.insertId || null
        });
    });
};

// 2. Listar itens na página inicial / vitrine
exports.listarItens = (req, res) => {
    itemModel.listarItens((err, results) => {
        if (err) {
            console.error("Erro ao listar itens:", err);
            return res.status(500).json({
                mensagem: "Erro ao listar itens."
            });
        }

        return res.status(200).json(results || []);
    });
};

// 3. Atualizar item
exports.atualizarItem = (req, res) => {
    const item = {
        id: req.params.id,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        categoria_id: req.body.categoria_id,
        estado: req.body.estado,
        usuario_id: req.usuario.id
    };

    itemModel.atualizarItem(item, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar item:", err);
            return res.status(500).json({
                mensagem: "Erro ao atualizar item."
            });
        }

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Item não encontrado ou você não tem permissão para alterá-lo."
            });
        }

        return res.status(200).json({
            mensagem: "Item atualizado com sucesso!"
        });
    });
};

// 4. Excluir item
exports.excluirItem = (req, res) => {
    const id = req.params.id;
    const usuario_id = req.usuario.id;

    itemModel.excluirItem(id, usuario_id, (err, result) => {
        if (err) {
            console.error("Erro ao excluir item:", err);
            return res.status(500).json({
                mensagem: "Erro ao excluir item."
            });
        }

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Item não encontrado ou você não tem permissão para excluí-lo."
            });
        }

        return res.status(200).json({
            mensagem: "Item excluído com sucesso!"
        });
    });
};