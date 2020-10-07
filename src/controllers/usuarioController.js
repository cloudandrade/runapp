const Usuario = require('../models/Usuario');
const { sequelize } = require('../config/db/db');
const { QueryTypes } = require('sequelize');
const Logger = require('../services/logger_service');
const bcrypt = require('bcryptjs');
const logger = new Logger('server');

//criar
exports.create = async (req, res) => {
	logger.info('Route - Criação de Usuário');
	let newUsuario = {
		nome: req.body.nome,
		email: req.body.email,
		senha: bcrypt.hashSync(req.body.senha, 8),
		perfil_id: req.body.perfil,
		level: 0,
		dificuldade_id: 1,
	};

	if (!newUsuario.nome) {
		res.status(400).send('O campo nome não pode ficar vazio');
	} else if (!newUsuario.email) {
		res.status(400).send('O campo email não pode ficar vazio');
	} else if (!newUsuario.senha) {
		res.status(400).send('O campo senha não pode ficar vazio');
	}
	console.log(newUsuario);
	console.log(newUsuario.senha);
	try {
		let payload = await Usuario.create(newUsuario);
		let response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao cadastrar usuário';
		logger.error(payload, error);
		throw Error(error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};

//buscar usuario detalhado por id
exports.index = async (req, res) => {
	logger.info('Route - Criação de Usuário');
	const id = req.params.id;

	try {
		let payload = await sequelize.query(
			`select u.id, u.nome, u.email, u.senha, u.level, d.description as dificuldade, p.tipo as perfil  from usuario u
    join perfil p 
    on u.perfil_id = p.id
    join dificuldade d
    on u.dificuldade_id = d.id
    and u.id = ${id}`,
			{
				type: QueryTypes.SELECT,
			}
		);
		let response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao buscar usuário';
		logger.error(payload, error);
		throw Error(error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
	}
};
