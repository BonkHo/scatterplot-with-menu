import React from "react";

const CircleMark = ({
	data,
	yScale,
	xScale,
	yValue,
	xValue,
	toolTipFormat,
	markRadius = 8,
	colorScale,
	colorValue,
}) => {
	return data.map((d) => (
		<circle
			className="mark"
			cx={xScale(xValue(d))}
			cy={yScale(yValue(d))}
			r={markRadius}
			fill={colorScale(colorValue(d))}
		>
			<title>{toolTipFormat(xValue(d))}</title>
		</circle>
	));
};

export default CircleMark;
