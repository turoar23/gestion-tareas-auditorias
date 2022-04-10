import { useRef } from "react";

const Create = props => {
    const nameRef = useRef();
    const categoryRef = useRef();

	const handleCreate = event => {
		event.preventDefault();
        
        const newCheckList = {
            name: nameRef.current.value,
            cateogry: categoryRef.current.value
        }
        console.log(newCheckList);
	};

	return (
		<form onSubmit={handleCreate}>
			<label>Name</label>
			<input ref={nameRef}></input>
			<label>Category</label>
			<select ref={categoryRef}>
				<option value='O1'>O1</option>
				<option value='O2'>O2</option>
				<option value='O3'>O3</option>
			</select>
			<button type='submit'>Crear</button>
		</form>
	);
};

export default Create;
