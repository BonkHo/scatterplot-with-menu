import "./App.css";
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

	return (
		<div className="App">
			<label for="pet-select">Choose a pet:</label>
			<Dropdown options={options} />
		</div>
	);
}

export default App;
