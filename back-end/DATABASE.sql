CREATE DATABASE IF NOT EXISTS `doe_se` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `doe_se`;

-- 1. Tabela: usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(200) NOT NULL UNIQUE,
  `telefone` VARCHAR(20) NOT NULL,
  `cpf` VARCHAR(14) NOT NULL UNIQUE,
  `senha` VARCHAR(255) NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  `bairro` VARCHAR(100) NOT NULL,
  `endereco` VARCHAR(255) NOT NULL,
  `foto_perfil` VARCHAR(255) DEFAULT NULL,
  `foto_documento` VARCHAR(255) DEFAULT NULL,
  `criado_em` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 2. Tabela: categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 3. Tabela: administradores
CREATE TABLE IF NOT EXISTS `administradores` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_admin_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 4. Tabela: itens
CREATE TABLE IF NOT EXISTS `itens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` INT(11) NOT NULL,
  `categoria_id` INT(11) NOT NULL,
  `titulo` VARCHAR(150) NOT NULL,
  `descricao` TEXT NOT NULL,
  `estado` ENUM('Ótimo','Bom','Razoável') NOT NULL,
  `cidade` VARCHAR(100) NOT NULL,
  `bairro` VARCHAR(100) NOT NULL,
  `status` ENUM('Disponível','Reservado','Doado') NOT NULL DEFAULT 'Disponível',
  `imagens_itens` VARCHAR(255) DEFAULT NULL,
  `criado_em` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_itens_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_itens_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 5. Tabela: imagens_itens
CREATE TABLE IF NOT EXISTS `imagens_itens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_id` INT(11) NOT NULL,
  `caminho_imagem` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_imagens_item` FOREIGN KEY (`item_id`) REFERENCES `itens` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 6. Tabela: solicitacoes
CREATE TABLE IF NOT EXISTS `solicitacoes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_id` INT(11) NOT NULL,
  `usuario_id` INT(11) NOT NULL,
  `mensagem` TEXT NOT NULL,
  `status` ENUM('pendente','aceita','recusada') NOT NULL DEFAULT 'pendente',
  `criado_em` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_solicitacoes_item` FOREIGN KEY (`item_id`) REFERENCES `itens` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_solicitacoes_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 7. Tabela: conversas
CREATE TABLE IF NOT EXISTS `conversas` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_id` INT(11) NOT NULL,
  `doador_id` INT(11) NOT NULL,
  `interessado_id` INT(11) NOT NULL,
  `criado_em` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_conversas_item` FOREIGN KEY (`item_id`) REFERENCES `itens` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_conversas_doador` FOREIGN KEY (`doador_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_conversas_interessado` FOREIGN KEY (`interessado_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 8. Tabela: mensagens
CREATE TABLE IF NOT EXISTS `mensagens` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `conversa_id` INT(11) NOT NULL,
  `remetente_id` INT(11) NOT NULL,
  `mensagem` TEXT NOT NULL,
  `lida` TINYINT(1) NOT NULL DEFAULT 0,
  `enviada_em` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_mensagens_conversa` FOREIGN KEY (`conversa_id`) REFERENCES `conversas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mensagens_remetente` FOREIGN KEY (`remetente_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 9. Tabela: comentarios
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_id` INT(11) NOT NULL,
  `usuario_id` INT(11) NOT NULL,
  `comentario` VARCHAR(500) NOT NULL,
  `data` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comentarios_item` FOREIGN KEY (`item_id`) REFERENCES `itens` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_comentarios_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 10. Tabela: avaliacoes
CREATE TABLE IF NOT EXISTS `avaliacoes` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `avaliador_id` INT(11) NOT NULL,
  `avaliado_id` INT(11) NOT NULL,
  `nota` INT(11) NOT NULL,
  `comentario` TEXT NOT NULL,
  `data` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_avaliacoes_avaliador` FOREIGN KEY (`avaliador_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_avaliacoes_avaliado` FOREIGN KEY (`avaliado_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 11. Tabela: denuncias
CREATE TABLE IF NOT EXISTS `denuncias` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` INT(11) NOT NULL,
  `tipo` ENUM('produto diferente do anuncio','produto inexistente','violação de dados','pratica de coerção') NOT NULL,
  `referencia_id` INT(11) NOT NULL,
  `motivo` TEXT NOT NULL,
  `status` ENUM('pendente','em análise','resolvida','rejeitada') NOT NULL DEFAULT 'pendente',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_denuncias_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insere categorias padrão para evitar erros no cadastro de itens
INSERT INTO `categorias` (`id`, `nome`) VALUES
(1, 'Móveis'),
(2, 'Eletrodomésticos'),
(3, 'Roupas'),
(4, 'Livros'),
(5, 'Outros')
ON DUPLICATE KEY UPDATE `nome`=`nome`;