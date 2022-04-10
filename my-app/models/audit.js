import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const audit = new Schema({
	name: {
		type: String,
		required: true,
	},
	auditor: {
		type: String,
		required: true,
	},
	category: {
		type: String,
	},
	jobs: [
		{
			name: String,
			value: String,
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

module.exports = mongoose.models.Audit || mongoose.model('Audit', audit);
