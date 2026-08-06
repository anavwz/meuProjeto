const solicitacaoModel = require("../models/solicitacaoModel");

// 1. Criar solicitação/pedido de um item
exports.criarSolicitacao = (req, res) => {
    const { item_id, mensagem } = req.body;

    if (!item_id || !mensagem) {
        return res.status(400).json({
            mensagem: "Informe o item desejado e envie uma mensagem."
        });
    }

    const solicitacao = {
        item_id,
        usuario_id: req.usuario.id,
        mensagem
    };

    solicitacaoModel.criarSolicitacao(solicitacao, (err, result) => {
        if (err) {
            console.error("Erro ao criar solicitação:", err);
            return res.status(500).json({
                mensagem: "Erro ao criar solicitação."
            });
        }

        return res.status(201).json({
            mensagem: "Solicitação enviada com sucesso!"
        });
    });
};

// 2. Listar minhas solicitações realizadas
exports.listarMinhasSolicitacoes = (req, res) => {
    solicitacaoModel.listarMinhasSolicitacoes(req.usuario.id, (err, results) => {
        if (err) {
            console.error("Erro ao listar solicitações:", err);
            return res.status(500).json({
                mensagem: "Erro ao listar solicitações."
            });
        }

        return res.status(200).json(results || []);
    });
};

// 3. Atualizar status (aceita / recusada / pendente)
exports.atualizarStatus = (req, res) => {
    const statusValidos = ["pendente", "aceita", "recusada"];
    const status = req.body.status;

    if (!statusValidos.includes(status)) {
        return res.status(400).json({
            mensagem: "Status inválido. Escolha entre: pendente, aceita ou recusada."
        });
    }

    solicitacaoModel.atualizarStatus(req.params.id, status, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar status:", err);
            return res.status(500).json({
                mensagem: "Erro ao atualizar status."
            });
        }

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Solicitação não encontrada."
            });
        }

        return res.status(200).json({
            mensagem: "Status atualizado com sucesso!"
        });
    });
};

// 4. Excluir solicitação
exports.excluirSolicitacao = (req, res) => {
    solicitacaoModel.excluirSolicitacao(req.params.id, req.usuario.id, (err, result) => {
        if (err) {
            console.error("Erro ao excluir solicitação:", err);
            return res.status(500).json({
                mensagem: "Erro ao excluir solicitação."
            });
        }

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                mensagem: "Solicitação não encontrada ou sem permissão."
            });
        }

        return res.status(200).json({
            mensagem: "Solicitação excluída com sucesso!"
        });
    });
};