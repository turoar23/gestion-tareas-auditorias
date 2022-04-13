import { Switch } from '@nextui-org/react';
import { useState, useRef } from 'react';

const BodyForm = props => {
    const checklist = props.checklist || null;

	const [status, setStatus] = useState(
        checklist ? checklist.status : false
    );

	const nameRef = useRef();
	const categoryRef = useRef();
	const periodicityRef = useRef();
	const dateRef = useRef();


	const handleStatus = props => {
		setStatus(props.target.checked);
	};
	const handleSubmit = event => {
		event.preventDefault();

		checklist = {
			...checklist,
			name: nameRef.current.value,
			category: categoryRef.current.value,
			periodicity: periodicityRef.current.value,
			status: status,
			date: dateRef.current.value,
		};
		props.onSubmit(checklist);
	};
	return (
		<form onSubmit={handleSubmit}>
			<label>Name</label>
			<input
				ref={nameRef}
				defaultValue={checklist ? checklist.name : null}
				required
			/>
			<label>Periodicity</label>
			<select
				ref={periodicityRef}
				defaultValue={checklist ? checklist.periodicity : null}
			>
				<option value='unique'>Unique</option>
				<option value='diary'>Diary</option>
			</select>
			<label>Starting date</label>

			<input
				ref={dateRef}
				type={'date'}
				required
				// defaultValue={checklist ? Date(checklist.date) : null}
			/>
			<label>Category</label>
			<select ref={categoryRef}
				defaultValue={checklist ? checklist.category : null}
            >
				<option value='O1'>O1</option>
				<option value='O2'>O2</option>
				<option value='O3'>O3</option>
			</select>
			<Switch checked={status} onChange={handleStatus} />
			<button type='submit'>
                {checklist ? 'Actualizar' : 'Crear'}
            </button>
		</form>
	);
};

export default BodyForm;
