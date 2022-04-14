import { Fragment, useState, useRef } from 'react';
import { Button } from '@nextui-org/react';
import Job from '../../components/audits/Job';
import { useRouter } from 'next/router';

const Create = ({ checklists }) => {
	const [jobs, setJobs] = useState([]);
	const auditorRef = useRef();
	const checklistRef = useRef();

	const router = useRouter();

	const handleChangeChecklist = () => {
		const checklistId = checklistRef.current.value;
		const checklist = checklists.find(
			checklist => checklist._id === checklistId
		);
		// const jobRefs = checklist.jobs.map(job => ({...job, ref: useRef()}))

		setJobs(checklist.jobs);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		const newAuditori = {
			checklist: checklistRef.current.value,
			auditor: auditorRef.current.value,
			jobs: jobs,
		};

		const request = await fetch('http://localhost:3000/api/audit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newAuditori),
		});

		if (request.ok) router.push('/audit');
	};

	return (
		<Fragment>
			<h1>Nueva Auditoria</h1>
			<form onSubmit={handleSubmit}>
				<label>Auditor</label>
				<input type={'text'} ref={auditorRef}></input>
				<Button type='submit'>Guardar</Button>
				<Button type='submit'>Guardar y rellenar</Button>
			</form>
			<div>
				<label>Check list disponibles</label>
				<select onChange={handleChangeChecklist} ref={checklistRef}>
					{checklists.map(checklist => (
						<option key={checklist._id} value={checklist._id}>
							{checklist.name}
						</option>
					))}
				</select>
			</div>
			{jobs.map(job => (
				<Job job={job} key={job.id} isChecklist={true} />
			))}
		</Fragment>
	);
};

export async function getStaticProps() {
	const res = await fetch('http://localhost:3000/api/checklist');
	const checklists = await res.json();

	return {
		props: {
			checklists,
		},
	};
}

export default Create;
