const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const checkList = new Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
	},
	periodicity: {
		type: String,
		required: false,
	},
	date: {
		type: Date,
		required: false,
	},
	status: {
		type: Boolean,
		required: true,
		default: false
	},
	jobs: [
		{
			name: String,
			description: String,
		},
	],
	create_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
});

// mongoose.models = {};

module.exports =
	mongoose.models.CheckList || mongoose.model('CheckList', checkList);
