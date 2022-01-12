import "./App.css";
import React, { useState } from "react";
import Dropdown from "./components/Dropdown";

function App() {
	const options = [
		{ value: "dog", label: "Dog" },
		{ value: "cat", label: "Cat" },
		{ value: "hamster", label: "Hamster" },
		{ value: "parrot", label: "Parrot" },
		{ value: "spider", label: "Spider" },
		{ value: "goldfish", label: "Goldfish" },
	];

	const initialValue = "hamster";
	const [selectedValue, setSelectedValue] = useState(initialValue);
	console.log(selectedValue);

	return (
		<div className="App">
			<label htmlFor="pet-select">Choose a pet:</label>
			<Dropdown
				options={options}
				id="pet-select"
				selectedValue={selectedValue}
				onSelectedValueChange={setSelectedValue}
			/>
		</div>
	);
}

export default App;
