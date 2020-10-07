const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Perfil = db.sequelize.define(
	'perfil',
	{
		tipo: {
			type: STRING,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Perfil',
		tableName: 'perfil',
	}
);

/*Perfil.sync({
    force: true
})*/
module.exports = Perfil;
