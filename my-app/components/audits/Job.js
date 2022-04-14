import { useRef, Fragment, useState } from 'react';
import { Button, Checkbox, Switch } from '@nextui-org/react';

import classes from './jobs.module.css';

const Job = props => {
	const job = props.job;
	const complete = job.complete;
	const isChecklist = props.isChecklist;

	const valueRef = useRef();
	const completeRef = useRef();

	const handleRemove = () => {
		props.onRemove(job._id);
	};

	const handleUpdate = () => {
		const updatedJob = {
			...job,
			value: valueRef.current.value,
			complete: complete
		}
		console.log(complete);
		props.onUpdate(updatedJob);
	};
	const handleChange = checked => {
		complete = checked;
		handleUpdate();
	};

	return (
		<div className={classes.job}>
			<div>Nombre: {job.name}</div>
			<div>Descripción: {job.description}</div>
			{!isChecklist && <Button onClick={handleRemove}>Borrar</Button>}
			{isChecklist && (
				<Fragment>
					<Checkbox initialChecked={complete} onChange={handleChange}>
						Completado
					</Checkbox>
					<label>Anotaciones</label>
					<input
						type={'text'}
						ref={valueRef}
						onChange={handleUpdate}
					></input>
				</Fragment>
			)}
		</div>
	);
};

export default Job;
