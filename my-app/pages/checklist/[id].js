import { Fragment } from 'react';
import { Link } from '@nextui-org/react';

import Job from '../../components/audits/jobs';

// Same page for show and edit
const Audit = ({ checklist }) => {
	return (
		<Fragment>
			<Link href='/audit'>Volver</Link>
			<form>
				<label>Name</label>
				<input required></input>
				<label>Category</label>
				<select>
					<option value='O1'>O1</option>
					<option value='O2'>O2</option>
					<option value='O3'>O3</option>
				</select>
				<button type='submit'>Crear</button>
			</form>
			<div>
				Agregar tarea
				<form>
					<label>Nombre</label>
					<input></input>
					<label>Descripción</label>
					<input></input>
					<button type='submit'>Agregar</button>
				</form>
				Tareas
				{checklist.jobs && checklist.jobs.map(job => (
					<Job job={job} key={job.id} />
				))}
			</div>
		</Fragment>
	);
};

export async function getStaticProps({ params }) {
	console.log(params);
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

export default Audit;
