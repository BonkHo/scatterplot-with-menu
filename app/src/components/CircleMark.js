import React from "react";

const CircleMark = ({
	data,
	yScale,
	xScale,
	yValue,
	xValue,
	toolTipFormat,
	markRadius = 8,
}) => {
	return data.map((d) => (
		<circle
			className="mark"
			cx={xScale(xValue(d))}
			cy={yScale(yValue(d))}
			r={markRadius}
		>
			<title>{toolTipFormat(xValue(d))}</title>
		</circle>
	));
};

export default CircleMark;
