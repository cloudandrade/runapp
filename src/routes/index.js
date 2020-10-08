const { Router } = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const os = require('os-utils');

const Auth = require('../controllers/authController');
const { checkAuthorization } = require('../services/auth');
//const estacaController = require('../controllers/estacaController');
const usuarioC = require('../controllers/usuarioController');
const desafioC = require('../controllers/desafioController');

const routes = Router();

/**
 * @swagger
 * /:
 *  get:
 *    tags: ["geral"]
 *    description: Use to return server info
 *    responses:
 *      '200':
 *        description: A sucessfull response with server info
 */
routes.get('/', async (req, res) => {
	function format(seconds) {
		function pad(s) {
			return (s < 10 ? '0' : '') + s;
		}
		var hours = Math.floor(seconds / (60 * 60));
		var minutes = Math.floor((seconds % (60 * 60)) / 60);
		var seconds = Math.floor(seconds % 60);
		return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
	}

	res.send({
		nomeApp: 'RunApp',
		plataforma: platform(),
		horaAtual: dateTime(),
		tempoAtivoSys: uptime(),
		tempoAtivoApp: format(process.uptime()),
		cpu: await cpuUsage(),
		memoria: memoryUsage(),
	});
});

/**
 * @swagger
 * /api/auth:
 *  post:
 *    tags: ["geral"]
 *    description: Use login in the application
 *    parameters: [
 *      	{
						"in": "body",
						"name": "body",
						"description": "send a email and password to",
						"required": true,
            "schema": {
              "properties":{
				        "email": { "type": "string"},
				        "senha": { "type": "string" }
              }
            }
					}
 *    ]
 *    responses:
 *      '200':
 *        description: A sucessfull response
 */
routes.post('/api/auth', Auth.auth);

routes.get('/auth/verify', checkAuthorization, async (req, res) => {
	res.json({
		error: null,
		data: {
			message: 'Autorizado com sucesso',
		},
	});
});

/**
 * @swagger
 * /api/users:
 *  post:
 *    tags: ["usuarios"]
 *    description: Use create a user
 *    parameters: [
 *      	{
						"in": "body",
						"name": "body",
						"description": "creates a user to use the application",
						"required": true,
            "schema": {
              "properties":{
								"nome": {"type": "string"},
				        "email": { "type": "string"},
								"senha": { "type": "string" },
								"perfil": {"type": "integer"}
              }
            }
					}
 *    ]
 *    responses:
 *      '200':
 *        description: A sucessfull response
 */
routes.post('/api/users', usuarioC.create);

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    tags: ["usuarios"]
 *    description: Use to find a detailed user by id
 *    parameters: [
					{
						"name": "id",
						"in": "path",
						"description": "ID of the user",
						"required": true,
						"type": "integer",
          },
        ]
 *    responses:
 *      '200':
 *        description: A sucessfull response
 */
routes.get('/api/users/:id', usuarioC.index);

/**
 * @swagger
 * /api/desafios/{id}:
 *  get:
 *    tags: ["desafios"]
 *    description: Use to find a desafio by id
 *    parameters: [
					{
						"name": "id",
						"in": "path",
						"description": "ID of the desafio",
						"required": true,
						"type": "integer",
          },
        ]
 *    responses:
 *      '200':
 *        description: A sucessfull response
 */
routes.get('/api/desafios/:id', desafioC.index);

/**
 * @swagger
 * /api/desafios:
 *  get:
 *    tags: ["desafios"]
 *    description: Use to find desafios by dificult
 *    parameters: [
					{
						"name": "dificuldade",
						"in": "query",
						"description": "dificult of the desafio",
						"type": "string",
          },
        ]
 *    responses:
 *      '200':
 *        description: A sucessfull response
 */
routes.get('/api/desafios', desafioC.list);

//rotas a serem criadas

/**
 *  - cadastrar corrida
 *  - buscar corridas do usuario - ordenado por data
 *  - setar dificuldade do usuario - alterar dificuldade
 * 	- buscar desafios do usuario
 * 	-	alterar desafio para concluido (automaticamente)
 * 	opcional
 * 	- rotas de perfil admin - criação de desafios novos
 */

//Test Routes Estacas
//routes.post('/estacas', estacaController.create);
//routes.get('/estacas', estacaController.list);
//routes.get('/estacas/:id', checkAuthorization, estacasController.index);

//misc functions
function uptime() {
	const minutesTime = os.sysUptime() / 60 / 60;
	const hours = Math.floor(minutesTime);
	const minutes = (minutesTime - hours) * 60;
	return `${hours}h${Math.round(minutes)}m`;
}

function platform() {
	let plataforma = os.platform();
	switch (plataforma) {
		case 'win32':
			plataforma = 'windows';
			break;
		case 'darwin':
			plataforma = 'mac-os';
			break;
		case 'linux':
			plataforma = 'linux';
			break;
		default:
			break;
	}
	return plataforma;
}

function cpuUsage() {
	return new Promise((resolve) => {
		os.cpuUsage((v) => {
			let cpupercent = v.toString().split('.');
			cpupercent = cpupercent[1].substring(0, 2);
			resolve(`${cpupercent}%`);
		});
	});
}

function memoryUsage() {
	let freememory = os.freememPercentage().toString().split('.');
	freememory = freememory[1].substring(0, 2);
	const memoryUsage = 100 - freememory;
	return `${memoryUsage}%`;
}

function dateTime() {
	const dateTimeNow = new Date();
	return `${dateTimeNow.getHours()}h${dateTimeNow.getMinutes()}m${dateTimeNow.getSeconds()}s`;
}

module.exports = routes;
