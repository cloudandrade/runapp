const db = require('../config/db/db');
const { STRING, INTEGER } = require('sequelize');

const Dificuldade = db.sequelize.define(
	'dificuldade',
	{
		tipo: {
			type: STRING,
			required: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Dificuldade',
		tableName: 'dificuldade',
	}
);

/*Dificuldade.sync({
    force: true
})*/
module.exports = Dificuldade;
