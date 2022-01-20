import React, { useState } from "react";
import ReactDropdown from "react-dropdown";
import { extent, scaleLinear, format, scaleOrdinal } from "d3";
import { useData } from "./hooks/useData";
import "./App.css";

// Components
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import CircleMark from "./components/CircleMark";
import ColorLegend from "./components/ColorLegend";

const App = () => {
	// Values for visual
	const data = useData();
	console.log(data);
	const width = 1200;
	const height = 500;
	const margin = { top: 30, right: 200, bottom: 80, left: 150 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const xAxisLabelOffset = 70;
	const yAxisLabelOffset = -70;
	const circleRadius = 8;
	const attributes = [
		{ value: "sepal_length", label: "Sepal Length" },
		{ value: "sepal_width", label: "Sepal Width" },
		{ value: "petal_length", label: "Petal Length" },
		{ value: "petal_width", label: "Petal Width" },
		{ value: "species", label: "Species" },
	];

	// States for axis
	const getLabel = (value) => {
		for (let i = 0; i < attributes.length; i++) {
			if (attributes[i].value === value) {
				return attributes[i].label;
			}
		}
	};

	// Values for data
	const initialXAttribute = "sepal_length";
	const [xAttribute, setXAttribute] = useState(initialXAttribute);
	const xValue = (d) => d[xAttribute];
	const xAxisLabel = getLabel(xAttribute);

	const initialYAttribute = "sepal_width";
	const [yAttribute, setYAttribute] = useState(initialYAttribute);
	const yValue = (d) => d[yAttribute];
	const yAxisLabel = getLabel(yAttribute);

	const colorValue = (d) => d.species;
	const colorLegendLabel = "Species";

	// Formatting for axis
	const siFormat = format(".2s");
	const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

	// Preloading data
	if (!data) {
		return <pre>"Loading"</pre>;
	}

	// Data loaded
	const colorScale = scaleOrdinal()
		.domain(data.map(colorValue))
		.range(["#ee9b00", "#94d2bd", "#ae2012"]);

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
			<div className="menus-container">
				<div className="single-dropdown">
					<span className="dropdown-label">X:</span>
					<ReactDropdown
						options={attributes}
						value={xAttribute}
						onChange={({ value }) => setXAttribute(value)}
					/>
				</div>
				<div className="single-dropdown">
					<span className="dropdown-label">Y:</span>
					<ReactDropdown
						options={attributes}
						value={yAttribute}
						onChange={({ value }) => setYAttribute(value)}
					/>
				</div>
			</div>
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
					<g transform={`translate(${innerWidth + 50}, 50)`}>
						<text
							x={40}
							y={-30}
							className="axis-label"
							style={{ textAnchor: "middle" }}
						>
							{colorLegendLabel}
						</text>
						<ColorLegend
							className="tick"
							colorScale={colorScale}
							legendSpacing={25}
							legendCircleRadius={circleRadius}
							legendTextOffset={20}
						/>
					</g>
					<CircleMark
						data={data}
						xScale={xScale}
						yScale={yScale}
						xValue={xValue}
						yValue={yValue}
						colorScale={colorScale}
						colorValue={colorValue}
						toolTipFormat={xAxisTickFormat}
						markRadius={circleRadius}
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
