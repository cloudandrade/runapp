const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Usuario = db.sequelize.define(
	'usuario',
	{
		email: {
			type: STRING,
			required: true,
		},
		senha: {
			type: STRING,
			required: true,
		},
		perfil_id: {
			type: INTEGER,
			required: true,
		},
		level: {
			type: INTEGER,
			required: true,
		},
		dificuldade_id: {
			type: INTEGER,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Usuario',
		tableName: 'usuario',
	}
);

/*Usuario.sync({
    force: true
})*/
module.exports = Usuario;
