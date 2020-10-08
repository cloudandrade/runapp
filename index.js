const express = require('express');
var bodyParser = require('body-parser');
const routes = require('./src/routes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

require('./src/config/db/db');

const PORT = process.env.PORT || '8001';

const server = express();

const Logger = require('./src/services/logger_service');
const logger = new Logger('server');

server.use(cors());

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const swaggerOptions = {
	swaggerDefinition: {
		info: {
			title: 'Run App API',
			description: 'A Running API Information',
			servers: ['http://localhost:8080'],
			tags: [
				{
					name: 'geral',
					description: 'Everything about your runners aplication',
				},
				{
					name: 'corridas',
					description: 'Everything about your runnings',
				},
				{
					name: 'usuarios',
					description: 'Everything about your agents',
				},
				{
					name: 'desafios',
					description: 'Everything about your challenges',
				},
			],
		},
	},
	//['.routes/*.js]
	apis: ['./src/routes/*.js'],
};

//Routes

const swaggerDocs = swaggerJsDoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

server.use(routes);

server.listen(PORT, () => {
	logger.info(`Servidor Correndo no Km: ${PORT}`.bgBlue);
});
