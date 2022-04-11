import Audit from '../../../models/audit';
import connectDB from '../../../middleware/db';

const handler = async (req, res) => {
	// Get the entire checklist or a single value
	if (req.method === 'GET') {
		try {
			// Check if was an ID in the request
			if (req.query.slug) {
				if (req.query.slug.length > 1)
					throw new Error('An error in the url was found');
				const auditId = req.query.slug[0];
				const audit = await Audit.findById(auditId);

				// check if there is no audit with the id
				if (!audit)
					throw new Error('There is no audit with that id');
				// If the audit was found
				res.status(200).json(audit);
			} else {
				const audits = await Audit.find();
				// Return also data from the checklist 
				const auditsWithCheck = await Audit.populate(audits, {
					path: 'checklist',
					select: 'name'
				})
				res.status(200).json(auditsWithCheck);
			}
		} catch (error) {
			res.status(422).send(error.message);
		}
	} else if (req.method === 'POST') {
		try {
			if (!req.body) throw new Error('holiii');
			const newAudit = await Audit.create({
				checklist: req.body.checklist,
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
