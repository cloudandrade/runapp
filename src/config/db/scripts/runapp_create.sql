CREATE SCHEMA `runapp`;

USE `runapp`;

CREATE TABLE `corridas` (
	`id` int NOT NULL AUTO_INCREMENT,
	`usuario_id` bigint NOT NULL,
	`distancia` DECIMAL NOT NULL,
	`duracao` varchar(255) NOT NULL,
	`pace` varchar(255) NOT NULL,
	`data` DATE NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `desafios` (
	`id` int NOT NULL AUTO_INCREMENT,
	`level_max` int,
	`usuario_id` bigint,
	`nome` varchar(255) NOT NULL,
	`descricao` varchar(255) NOT NULL,
	`distancia` DECIMAL NOT NULL,
	`duracao` varchar(255),
	`alternancia` varchar(255) NOT NULL,
	`pace` DECIMAL,
	`is_complete` bigint NOT NULL,
	`dificuldade_id` bigint NOT NULL,
	`exp` bigint,
	PRIMARY KEY (`id`)
);

CREATE TABLE `usuario` (
	`id` int NOT NULL AUTO_INCREMENT,
	`perfil_id` int NOT NULL,
	`nome` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`senha` varchar(255) NOT NULL,
	`level` bigint NOT NULL,
	`dificuldade_id` bigint NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `perfil` (
	`id` int NOT NULL AUTO_INCREMENT,
	`tipo` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `dificuldade` (
	`id` bigint NOT NULL AUTO_INCREMENT,
	`description` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);