import { Button } from '@nextui-org/react';
import classes from './jobs.module.css';

const Job = props => {
	const isCheckList = props.isCheckList;
	const job = props.job;

	const handleRemove = () => {
		props.onRemove(job._id);
	};

	return (
		<div className={classes.job}>
			<div>Nombre: {job.name}</div>
			{/* {isCheckList && <div>description: {job.description}</div>} */}
			<div>Descripción {job.description}</div>
			<Button onClick={handleRemove}>Borrar</Button>
			{/* {!isCheckList && <div>value: {job.value}</div>} */}
		</div>
	);
};

export default Job;
