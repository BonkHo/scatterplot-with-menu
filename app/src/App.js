import React from "react";
import { extent, scaleLinear, format } from "d3";
import { useData } from "./hooks/useData";
import "./App.css";

// Components
import AxisBottom from "./components/AxisBottom";
import AxisLeft from "./components/AxisLeft";
import CircleMark from "./components/CircleMark";

const App = () => {
	const width = 1200;
	const height = 500;
	const margin = { top: 30, right: 30, bottom: 80, left: 250 };
	const innerWidth = width - margin.left - margin.right;
	const innerHeight = height - margin.top - margin.bottom;
	const data = useData();
	const xAxisLabelOffset = 70;
	const yAxisLabelOffset = -70;

	const xAxisLabel = "Sepal Length";
	const yAxisLabel = "Sepal Width";
	const xValue = (d) => d.sepal_length;
	const yValue = (d) => d.sepal_width;

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
	);
};

export default App;
