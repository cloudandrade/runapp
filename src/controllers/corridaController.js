const Corridas = require('../models/Corridas');
const { sequelize } = require('../config/db/db');
const { QueryTypes } = require('sequelize');
const Logger = require('../services/logger_service');
const bcrypt = require('bcryptjs');
const logger = new Logger('server');

//criar
exports.create = async (req, res) => {
	logger.info('Route - Criação de Registro de Corrida');

	let usuarioId = req.body.usuarioId;
	let parseDate = req.body.data;
	parseDate = parseDate.split('-');
	parseDate = `${parseDate[2]}-${parseDate[1]}-${parseDate[0]}`;

	let newCorrida = {
		distancia: req.body.distancia,
		duracao: req.body.duracao,
		pace: req.body.pace,
		data: parseDate,
	};

	if (!newCorrida.distancia) {
		res.status(400).send('O campo distancia não pode ficar vazio');
	} else if (!newCorrida.duracao) {
		res.status(400).send('O campo duracao não pode ficar vazio');
	} else if (!newCorrida.pace) {
		res.status(400).send('O campo pace não pode ficar vazio');
	} else if (!newCorrida.data) {
		res.status(400).send('O campo data não pode ficar vazio');
	}

	try {
		//insert de corrida na tabela principal
		let payload = await sequelize.query(`INSERT INTO
		corridas (distancia, duracao, pace, data  )
		VALUES
		(${newCorrida.distancia}, '${newCorrida.duracao}', ${newCorrida.pace}, DATE('${newCorrida.data}'))`);

		//insert de corrida na tabela auxiliar - vinculando corrida ao usuario
		let aux = await sequelize.query(`INSERT INTO
		usuario_corridas (usuario_id, corrida_id)
		VALUES
		(${usuarioId}, ${payload[0]})`);
		//payload irá retornar um objeto com um array contendo o id do objeto criado e o número de objetos na query, geralmente 1
		payload = await Corridas.findOne({ where: { id: payload[0] } });
		console.log(payload); //id do objeto cadastrado?
		let response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao cadastrar registro de corrida';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
		throw Error(error);
	}
};

//Buscar desafios do usuário
exports.list = async (req, res) => {
	logger.info('Route - Busca de Corridas do Usuário');
	const usuarioId = req.params.usuarioId;

	try {
		let payload = await sequelize.query(
			`select c.distancia, c.duracao, c.pace, c.data from corridas as c
			join usuario_corridas uc on 
			uc.usuario_id = ${usuarioId} 
			and
			uc.corrida_id = c.id`,
			{
				type: QueryTypes.SELECT,
			}
		);
		let response = { sucess: true, payload };
		return res.send(response);
	} catch (error) {
		let payload = 'falha ao buscar corridas do usuário';
		logger.error(payload, error);
		let response = { sucess: false, payload };
		res.status(500).send(response);
		throw Error(error);
	}
};
