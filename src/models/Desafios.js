const db = require('../config/db/db');
const { STRING, INTEGER, FLOAT } = require('sequelize');

const Desafios = db.sequelize.define(
	'desafios',
	{
		level_max: {
			type: INTEGER,
			required: true,
		},
		usuario_id: {
			type: INTEGER,
			required: true,
		},
		nome: {
			type: STRING,
			required: true,
		},
		descricao: {
			type: STRING,
			required: true,
		},
		distancia: {
			type: FLOAT,
			required: true,
		},
		duracao: {
			type: STRING,
			required: true,
		},
		alternancia: {
			type: STRING,
			required: true,
		},
		pace: {
			type: FLOAT,
		},
		is_complete: {
			type: INTEGER,
		},
		dificuldade_id: {
			type: INTEGER,
			required: true,
		},
		exp: {
			type: INTEGER,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		modelName: 'Desafios',
		tableName: 'desafios',
	}
);

/*Desafios.sync({
    force: true
})*/
module.exports = Desafios;
