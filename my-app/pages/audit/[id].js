import { Button } from '@nextui-org/react';
import { Fragment } from 'react';
import Job from '../../components/audits/Job';

const Edit = ({ audit }) => {
	const jobs = audit.jobs ? audit.jobs : null;

	const handleUpdateJob = updatedJob => {
		const jobIndex = jobs.findIndex(job => job._id === updatedJob._id);
		// const job = jobs[jobIndex];

		jobs[jobIndex] = updatedJob;
		// setJobs(jobs);

		console.log(jobs);
	};

	const updateAuditori = async () => {
		const updateAuditori = {
			...audit,
			jobs: jobs,
		};

		const response = await fetch(
			'http://localhost:3000/api/audit/' + audit._id,
			{
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(updateAuditori),
			}
		);

		if (response.ok) console.log('guay');
	};

	return (
		<Fragment>
			<h1>Rellenar auditoria</h1>
			<Button onClick={updateAuditori}>Actualizar</Button>
			{jobs.map(job => (
				<Job
					job={job}
					key={job.id}
					isChecklist={true}
					onUpdate={handleUpdateJob}
				/>
			))}
		</Fragment>
	);
};

export async function getStaticProps({ params }) {
	const response = await fetch(
		'http://localhost:3000/api/audit/' + params.id
	);
	const audit = await response.json();

	return {
		props: { audit },
	};
}

export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:3000/api/audit');
	const audits = await res.json();

	// Get the paths we want to pre-render based on posts
	const paths = audits.map(audit => ({
		params: { id: audit._id },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export default Edit;
