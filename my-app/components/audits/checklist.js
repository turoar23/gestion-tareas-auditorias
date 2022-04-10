import { Table } from '@nextui-org/react';

import Job from './jobs';

const CheckList = props => {
	const checklist = props.checklist;

	// return (
	// 	<div>
	// 		<h1>{checklist.name}</h1>
	// 		{checklist.jobs.map(job => (
	// 			<Job key={job._id} job={job} />
	// 		))}
	// 	</div>
	// );

	return (
		<Table.Row>
			<Table.Cell>{checklist.name}</Table.Cell>
			<Table.Cell>{checklist.category}</Table.Cell>
			<Table.Cell>{checklist.description}</Table.Cell>
		</Table.Row>
	);
};

export default CheckList;
