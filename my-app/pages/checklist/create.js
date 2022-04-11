import { useRef, Fragment, useState } from 'react';
import { Link } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';

import Job from '../../components/audits/jobs';

const Create = props => {
	const [jobs, setJobs] = useState([]);
	const nameRef = useRef();
	const categoryRef = useRef();
	const nameJobRef = useRef();
	const descriptionJobRef = useRef();
	const router = useRouter();

	// const edit = props.edit;

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
		const filteredJobs = jobs.filter(job => job.id !== jobId);
		setJobs(filteredJobs);
	};

	const handleCreate = async event => {
		event.preventDefault();

		const newCheckList = {
			name: nameRef.current.value,
			category: categoryRef.current.value,
			jobs: jobs,
		};
		console.log(newCheckList);

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
			<Link href='/audit'>Volver</Link>
			<form onSubmit={handleCreate}>
				<label>Name</label>
				<input ref={nameRef} required></input>
				<label>Category</label>
				<select ref={categoryRef}>
					<option value='O1'>O1</option>
					<option value='O2'>O2</option>
					<option value='O3'>O3</option>
				</select>
				<button type='submit'>Crear</button>
			</form>
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
