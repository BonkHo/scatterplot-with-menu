import React from "react";

const AxisBottom = ({ xScale, innerHeight, tickFormat, tickOffset = 3 }) => {
	return xScale.ticks().map((tick) => (
		<g className="tick" key={tick} transform={`translate(${xScale(tick)}, 0)`}>
			<line y2={innerHeight} />
			<text
				dy={"1em"}
				y={innerHeight + tickOffset}
				style={{ textAnchor: "middle" }}
			>
				{tickFormat(tick)}
			</text>
		</g>
	));
};

export default AxisBottom;
