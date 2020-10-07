const { Router } = require('express');
const Auth = require('../controllers/authController');
const { checkAuthorization } = require('../services/auth');
//const estacaController = require('../controllers/estacaController');
const usuarioC = require('../controllers/usuarioController');
const desafioC = require('../controllers/desafioController');

const routes = Router();

routes.get('/', (req, res) => {
	res.send('Server Running');
});

routes.post('/api/auth', Auth.auth);

routes.get('/auth/verify', checkAuthorization, async (req, res) => {
	res.json({
		error: null,
		data: {
			message: 'Autorizado com sucesso',
		},
	});
});

routes.post('/api/users', usuarioC.create);
routes.get('/api/users/:id', usuarioC.index);
routes.get('/api/desafios/:id', desafioC.index);
routes.get('/api/desafios', desafioC.list);

//rotas a serem criadas

/**
 * 	- cadastro e login
 *  - buscar dados usuario
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

module.exports = routes;
