import React from "react";

const Dropdown = ({ options, id, onSelectedValueChange, selectedValue }) => {
	return (
		<select
			name="pets"
			id={id}
			onChange={(event) => onSelectedValueChange(event.target.value)}
		>
			{options.map(({ value, label }) => (
				<option defaultValue={value} selected={value === selectedValue}>
					{label}
				</option>
			))}
		</select>
	);
};

export default Dropdown;
