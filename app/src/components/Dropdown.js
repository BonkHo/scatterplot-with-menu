import React from "react";

const Dropdown = ({ options, id, onSelectedValueChange, selectedValue }) => {
	return (
		<select
			id={id}
			onChange={(event) => onSelectedValueChange(event.target.value)}
		>
			{options.map(({ value, label }) => (
				<option value={value} selected={value === selectedValue}>
					{label}
				</option>
			))}
		</select>
	);
};

export default Dropdown;
