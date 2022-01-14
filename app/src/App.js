import React, { useState } from "react";
import { extent, scaleLinear, format } from "d3";
import { useData } from "./hooks/useData";
import "./App.css";

// Components
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import CircleMark from "./components/CircleMark";
import Dropdown from "./components/Dropdown";

const App = () => {
	// Values for visual
	const data = useData();
	const width = 1200;
	const height = 500;
	const margin = { top: 30, right: 30, bottom: 80, left: 250 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const xAxisLabelOffset = 70;
	const yAxisLabelOffset = -70;
	const attributes = [
		{ value: "sepal_length", label: "Sepal Length" },
		{ value: "sepal_width", label: "Sepal Width" },
		{ value: "petal_length", label: "Petal Length" },
		{ value: "petal_width", label: "Petal Width" },
		{ value: "species", label: "Species" },
	];

	// States for axis

	// Values for data
	const initialXAttribute = "sepal_length";
	const [xAttribute, setXAttribute] = useState(initialXAttribute);
	const xValue = (d) => d[xAttribute];
	const xAxisLabel = "Sepal Length";

	const initialYAttribute = "sepal_width";
	const [yAttribute, setYAttribute] = useState(initialYAttribute);
	const yValue = (d) => d[yAttribute];
	const yAxisLabel = "Sepal Width";

	// Formatting for axis
	const siFormat = format(".2s");
	const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

	if (!data) {
		return <pre>"Loading"</pre>;
	}

	const xScale = scaleLinear()
		.domain(extent(data, xValue))
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear()
		.domain(extent(data, yValue))
		.range([0, innerHeight])
		.nice();

	return (
		<>
			<label for="x-select">X:</label>
			<Dropdown
				options={attributes}
				id="x-select"
				selectedValue={xAttribute}
				onSelectedValueChange={setXAttribute}
			/>
			<label for="y-select">Y:</label>
			<Dropdown
				options={attributes}
				id="y-select"
				selectedValue={yAttribute}
				onSelectedValueChange={setYAttribute}
			/>
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left}, ${margin.top})`}>
					<AxisBottom
						xScale={xScale}
						innerHeight={innerHeight}
						tickFormat={xAxisTickFormat}
					/>
					<text
						className="axis-label"
						x={yAxisLabelOffset}
						y={innerHeight / 2}
						style={{ textAnchor: "middle" }}
						transform={`rotate(-90, ${yAxisLabelOffset}, ${innerHeight / 2})`}
					>
						{yAxisLabel}
					</text>
					<AxisLeft yScale={yScale} innerWidth={innerWidth} />
					<CircleMark
						data={data}
						xScale={xScale}
						yScale={yScale}
						xValue={xValue}
						yValue={yValue}
						toolTipFormat={xAxisTickFormat}
					/>
					<text
						className="axis-label"
						x={innerWidth / 2}
						y={innerHeight + xAxisLabelOffset}
						style={{ textAnchor: "middle" }}
					>
						{xAxisLabel}
					</text>
				</g>
			</svg>
		</>
	);
};

export default App;
