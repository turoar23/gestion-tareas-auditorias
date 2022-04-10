import Audit from '../../models/audit';
import connectDB from '../../middleware/db';

const handler = async (req, res) => {
	if (req.method === 'GET') {
		try {
			const models = await Audit.find();
			res.status(200).json(models);
		} catch (error) {
			res.status(422).send('Error');
		}
	} else if (req.method === 'POST') {
		try {
			if (!req.body) throw new Error('holiii');
			const newAudit = await Audit.create({
				name: req.body.name,
				category: req.body.category,
				auditor: req.body.auditor, // TODO: Change with the username when the auth works
				jobs: req.body.jobs,
				create_at: Date.now(),
				updated_at: Date.now(),
			});
			res.status(200).json(newAudit);
		} catch (error) {
			res.status(422).send(error.message);
		}
	} else {
		res.status(200).json({ name: 'John Doe' });
	}
};

export default connectDB(handler);
