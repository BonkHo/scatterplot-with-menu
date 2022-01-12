import React from "react";

const Dropdown = ({ options }) => {
	return (
		<select name="pets" id="pet-select">
			<option value="">--Please choose an option--</option>
			{options.map((option) => (
				<option value={option.value}>{option.label}</option>
			))}
		</select>
	);
};

export default Dropdown;
