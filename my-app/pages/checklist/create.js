import { useRef, Fragment, useState } from 'react';
import { Link, Switch } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

import Job from '../../components/audits/jobs';
import BodyForm from '../../components/checklist/BodyForm';

const Create = props => {
	const [jobs, setJobs] = useState([]);

	const nameJobRef = useRef();
	const descriptionJobRef = useRef();

	const router = useRouter();

	const handleAddJob = event => {
		event.preventDefault();

		const job = {
			_id: nanoid(),
			name: nameJobRef.current.value,
			description: descriptionJobRef.current.value,
		};
		setJobs([...jobs, job]);
	};

	const handleRemoveJob = jobId => {
		const filteredJobs = jobs.filter(job => job.id !== jobId);
		setJobs(filteredJobs);
	};

	const handleCreate = async newCheckList => {
		newCheckList = {
			...newCheckList,
			jobs: jobs.map(job => ({
				name: job.name,
				description: job.description,
			})),
		};

		const request = await fetch('http://localhost:3000/api/checklist', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCheckList),
		});
		if (request.ok) router.push('/checklist');
	};

	return (
		<Fragment>
			<Link href='/checklist'>Volver</Link>
			<BodyForm onSubmit={handleCreate} />
			{/* To add jobs */}
			<div>
				Agregar tarea
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

export default Create;
