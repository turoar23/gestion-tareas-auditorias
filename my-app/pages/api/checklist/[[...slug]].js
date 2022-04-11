import CheckList from '../../../models/checkList';
import connectDB from '../../../middleware/db';

const handler = async (req, res) => {
	// Get the entire checklist or a single value
	if (req.method === 'GET') {
		try {
			// Check if was an ID in the request
			if (req.query.slug) {
				if (req.query.slug.length > 1)
					throw new Error('An error in the url was found');
				const checklistId = req.query.slug[0];
				const checklist = await CheckList.findById(checklistId);

				// check if there is no checlist with the id
				if (!checklist)
					throw new Error('There is no checklist with that id');
				// If the checklist was found
				res.status(200).json(checklist);
			} else {
				const models = await CheckList.find();
				res.status(200).json(models);
			}
		} catch (error) {
			res.status(422).send(error.message);
		}
	}
	// Create a check list
	else if (req.method === 'POST') {
		try {
			if (!req.body) throw new Error('holiii');
			const newCheckList = await CheckList.create({
				name: req.body.name,
				category: req.body.category,
				jobs: req.body.jobs,
				create_at: Date.now(),
				updated_at: Date.now(),
			});
			res.status(200).json(newCheckList);
		} catch (error) {
			res.status(422).send(error.message);
		}
	} else if (req.method === 'PUT') {
		try {
			// If the url is shorter or larger than the expected, thown an error
			if ((req.query.length > 2 && !req.query.length > 0) || !req.body)
				throw new Error('An error in the url was found');
			const id = req.query.slug[0];
			const checklist = await CheckList.findById(id);

			if (!checklist)
				throw new Error('The checklist with that id dosent exist');

			// Check if the checklist have the types corrected
			checklist.name = req.body.name;
			checklist.category = req.body.category;
			checklist.jobs = req.body.jobs;
			checklist.updated_at = Date.now();

			await checklist.save();
			res.status(200).json('Checklist updated');
		} catch (error) {
			res.status(404).json(error.message);
		}
	}
	// Delete a check list
	else if (req.method === 'DELETE') {
		try {
			// If the url is shorter or larger than the expected, thown an error
			if (!req.query.length > 0 && req.query.length > 2)
				throw new Error('An error in the url was found');
			const id = req.query.slug[0];
			const checklist = await CheckList.findById(id);

			if (!checklist)
				throw new Error('The checklist with that id dosent exist');

			await checklist.remove();
			res.status(200).json('Checklist deleted');
		} catch (error) {
			res.status(404).json(error.message);
		}
	} else {
		res.status(405).json({ error: 'Method not supported' });
	}
};

export default connectDB(handler);
