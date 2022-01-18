import React from "react";

const ColorLegend = ({ colorScale }) => {
	return colorScale.domain().map((domainValue) => {
		console.log(domainValue);
		return (
			<g>
				<circle fill={colorScale(domainValue)} />
				<text>{domainValue}</text>
			</g>
		);
	});
};

export default ColorLegend;
