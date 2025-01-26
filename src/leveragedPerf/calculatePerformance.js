const { fileKey, etfExpectedPerformance, frequencies } = require("./config");
const { loadFromLocal, saveToLocal } = require("../lib/utils/localData");

const calculatePerformance = () => {
	Object.keys(etfExpectedPerformance).forEach((symbol) => {
		Object.keys(frequencies).forEach((frequency) => {
			const { candles: data } = loadFromLocal(`${fileKey}-${symbol}-${frequency}`);
			performance = Object.fromEntries(
				data.slice(1).map(({ close, datetime }, index) => {
					return [datetime, (close / data[index].close) - 1 ];
				})
			);
			saveToLocal(`${fileKey}-${symbol}-${frequency}-performance`, performance);
		});
	});
};

calculatePerformance();
