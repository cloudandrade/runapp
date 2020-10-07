const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const Logger = require('../services/logger_service');
const logger = new Logger('server');

const auth = async (req, res) => {
	console.log(req.body.email);
	Usuario.findOne({
		where: {
			email: req.body.email,
		},
	})
		.then((usuario) => {
			if (!usuario) {
				return res.status(404).send('Falha de Login, email não encontrado');
			}

			let passwordIsValid = bcrypt.compareSync(req.body.senha, usuario.senha);
			if (!passwordIsValid) {
				return res.status(401).send({
					auth: false,
					accessToken: null,
					reason: 'Senha Invalida!',
				});
			}

			let token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || 'corky', {
				expiresIn: 86400, // expires in 24 hours
			});

			res.status(200).send({
				auth: true,
				accessToken: token,
				payload: usuario,
			});
		})
		.catch((err) => {
			logger.error(err);
			res.status(500).send('Internal Server Error ' + err);
		});
};

module.exports = { auth };
