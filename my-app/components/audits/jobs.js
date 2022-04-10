import classes from './jobs.module.css';

const Job = props => {
	const isCheckList = props.isCheckList;
	const job = props.job;

	return (
		<div className={classes.job}>
			<div>name: {job.name}</div>
			{isCheckList && <div>description: {job.description}</div>}
			{!isCheckList && <div>value: {job.value}</div>}
		</div>
	);
};

export default Job;
