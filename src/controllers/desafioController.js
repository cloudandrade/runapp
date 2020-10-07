const Desafio = require('../models/Desafios');
const Logger = require('../services/logger_service');
const logger = new Logger('server');
const { sequelize } = require('../config/db/db');

//método responsavel pela criação
/* exports.create = async (req, res) => {
	logger.info('Route - Criação de Estaca'); //
	let newEstaca = req.body; //pegando a requisição que vem da web e instanciando em forma de objeto

	if (!newEstaca.nome) {
		//verificando se os dados estão incompletos
		res.status(400).send('O campo nome não pode ficar vazio');
		// http status 400 - bad request - quando algum campo está com problema
	}

	try {
		let payload = await Estaca.create(newEstaca);
		let response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		let payload = 'Falha ao cadastrar estaca';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
		// http status 500 - internal server error - algum erro inesperado ou erro de programaçao
	}
}; */

//método resbonsável por buscar um DESAFIO
exports.index = async (req, res) => {
	logger.info('Route - Busca de Desafios');
	const { id } = req.params;

	try {
		let desafio = await Desafio.findOne({ where: { id: id } });
		let payload = desafio;
		let response = { sucess: true, payload };
		if (!desafio) {
			response = {
				sucess: true,
				payload: 'Desafio não encontrado',
			};
			return res.status(404).send(response);
		}
		res.send(response);
	} catch (error) {
		let payload = 'Erro ao buscar desafio';
		logger.error(payload, error);
		const response = { sucess: false, payload };
		res.status(500).send(response);
		// http status 500 - internal server error - algum erro inesperado ou erro de programaçao
	}
};

//método responsável pela listagem
exports.list = async (req, res) => {
	logger.info('Route - Listagem de desafios por dificuldade');
	let dificuldade = req.query.dificuldade;

	switch (dificuldade) {
		case 'iniciante':
			dificuldade = 1;
			break;
		case 'intermediario':
			dificuldade = 2;
			break;
		case 'avancado':
			dificuldade = 3;
			break;
		case 'profissional':
			dificuldade = 4;
			break;

		default:
			dificuldade = 1;
			break;
	}

	try {
		const desafios = await Desafio.findAll({
			where: { dificuldade_id: dificuldade },
		});
		let payload = desafios;
		let response = { sucess: true, payload };
		if (!desafios.length) {
			response = {
				sucess: true,
				payload: 'Não existem mais desafios',
			};
			return res.status(404).send(response);
		}
		return res.send(response);
	} catch (error) {
		let payload = 'Falha ao buscar desafios';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
		throw Error(error);
	}
};
