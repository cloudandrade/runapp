const db = require('../config/db/db');
const { STRING, INTEGER, FLOAT, DATE } = require('sequelize');

const Corridas = db.sequelize.define(
	'corridas',
	{
		distancia: {
			type: FLOAT,
			required: true,
		},
		duracao: {
			type: STRING,
			required: true,
		},
		pace: {
			type: STRING,
			required: true,
		},
		data: {
			type: DATE,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Corridas',
		tableName: 'corridas',
	}
);

/*Corridas.sync({
    force: true
})*/
module.exports = Corridas;
