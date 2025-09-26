const modelStrategy = ({ data, strategy }) => {
	const results = {};
	Object.keys(data).forEach((timestamp, index) => {
		const position = strategy({ timestamp, index, data });
		const value = Object.keys(position).reduce((accum, symbol) => {
			return accum + data[timestamp][symbol].close * position[symbol];
		}, 0);
		results[timestamp] = {
			position,
			value
		};
	});

	return results;
};

module.exports = {
	modelStrategy
};
