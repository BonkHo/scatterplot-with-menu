import React from "react";

const Dropdown = ({ options, id, onSelectedValueChange }) => {
	return (
		<select
			name="pets"
			id={id}
			onChange={(event) => onSelectedValueChange(event.target.value)}
		>
			{options.map(({ value, label }) => (
				<option value={value}>{label}</option>
			))}
		</select>
	);
};

export default Dropdown;
