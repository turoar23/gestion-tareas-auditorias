import mongoose from 'mongoose';
var Schema = mongoose.Schema;

const audit = new Schema({
	checklist: {
		type: Schema.Types.ObjectId,
		ref: 'CheckList',
		required: true
	},
	auditor: {
		type: String,
		required: true,
	},
	jobs: [
		{
			name: String,
			value: String,
			complete: {
				type: Boolean,
				default: false
			}
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
