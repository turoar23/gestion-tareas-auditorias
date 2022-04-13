import { Fragment, useState, useRef } from 'react';
import { Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

import Job from '../../components/audits/jobs';
import BodyForm from '../../components/checklist/BodyForm';

// Same page for show and edit
const Edit = ({ checklist }) => {
	const [jobs, setJobs] = useState(checklist.jobs);

	const router = useRouter();

	const nameJobRef = useRef();
	const descriptionJobRef = useRef();

	const handleAddJob = event => {
		event.preventDefault();

		const job = {
			id: nanoid(),
			name: nameJobRef.current.value,
			description: descriptionJobRef.current.value,
		};
		setJobs([...jobs, job]);
	};

	const handleRemoveJob = jobId => {
		const filteredJobs = jobs.filter(job => job._id !== jobId);
		setJobs(filteredJobs);
	};

	const handleUpdate = async updatedChecklist => {
		updatedChecklist = {
			...updatedChecklist,
			jobs: jobs,
		};

		const request = await fetch('http://localhost:3000/api/checklist/' + updatedChecklist._id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedChecklist),
		});
		if (request.ok) router.push('/checklist');
	};

	return (
		<Fragment>
			<Link href='/checklist'>Volver</Link>
			<BodyForm checklist={checklist} onSubmit={handleUpdate}/>
			<div>
				Tareas
				<form onSubmit={handleAddJob}>
					<label>Nombre</label>
					<input ref={nameJobRef}></input>
					<label>Descripción</label>
					<input ref={descriptionJobRef}></input>
					<button type='submit'>Agregar</button>
				</form>
				Tareas
				{jobs.map(job => (
					<Job job={job} key={job.id} onRemove={handleRemoveJob} />
				))}
			</div>
		</Fragment>
	);
};

export async function getStaticProps({ params }) {
	const response = await fetch(
		'http://localhost:3000/api/checklist/' + params.id
	);
	const checklist = await response.json();

	return {
		props: { checklist },
	};
}
export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const res = await fetch('http://localhost:3000/api/checklist');
	const checklists = await res.json();

	// Get the paths we want to pre-render based on posts
	const paths = checklists.map(checklist => ({
		params: { id: checklist._id },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export default Edit;
