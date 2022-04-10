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

module.exports = mongoose.models.CheckList || mongoose.model('CheckList', checkList);
