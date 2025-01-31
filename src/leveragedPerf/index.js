const { fileKey, etfExpectedPerformance, frequencies } = require("./config");

const { loadFromLocal, saveToLocal } = require("../lib/utils/localData");
const { logError, logInfo } = require("../lib/utils/logger");

// WE NEED TO COMPARE INTRADAY TO PRICE AT OPEN

const roundToDate = (timestamp) => {
	const date = new Date(timestamp);
	date.setHours(0, 0, 0, 0);
	return date.getTime();
};

const calculateDailyPerformance = () => {
	const baseSymbol = "QQQ";
	const { candles: baseData } = loadFromLocal(`${fileKey}-${baseSymbol}-day`);
	const basePerformance = Object.fromEntries(baseData.map(({ close, datetime, open }) => [roundToDate(datetime), (close / open) - 1]));
	const result = Object.fromEntries(Object.keys(basePerformance).map((datetime) => [datetime, {}]));
	const stats = {};

	Object.keys(etfExpectedPerformance).forEach((symbol) => {
		if (symbol === baseSymbol) return;
		const file = `${fileKey}-${symbol}-day`;
		const { candles: data } = loadFromLocal(file);
		const diffs = []
		data.forEach(({ close, datetime, open }) => {
			const timestamp = roundToDate(datetime)
			if (result[timestamp]) {
				perfDiff = ((close / open) - 1) - basePerformance[timestamp];
				result[timestamp][symbol] = perfDiff;
				diffs.push(perfDiff);
			}
		})
		const mean = diffs.reduce((accum, val) => accum + val, 0) / diffs.length;
		const stdev = Math.pow(diffs.reduce((accum, val) => accum + Math.pow(val - mean, 2)) / diffs.length, .5);
		stats[symbol] = { mean, stdev };
	});

	saveToLocal(`${fileKey}-daily-performance`, result);
	saveToLocal(`${fileKey}-daily-performance-stats`, stats);
};

calculateDailyPerformance();

// const main = async () => {
// 	try {
// 		Object.keys(frequencies).forEach((frequency) => {
// 			const basePerformance = loadFromLocal(`${fileKey}-QQQ-${frequency}-performance`);
// 			const performanceDiscrepancy = Object.fromEntries(Object.keys(basePerformance).map((timestamp) => [timestamp, {}]));
// 			Object.keys(etfExpectedPerformance).forEach((symbol) => {
// 				const performance = loadFromLocal(`${fileKey}-${symbol}-${frequency}-performance`);
// 				Object.keys(performance).forEach((timestamp) => {
// 					const basePerformanceAtDate = basePerformance[timestamp];
// 					if (basePerformanceAtDate) {
// 						performanceDiscrepancy[timestamp][symbol] = ((performance[timestamp] / basePerformanceAtDate) / etfExpectedPerformance[symbol]) - 1
// 					}
// 				});
// 			})
// 			saveToLocal(`${fileKey}-${frequency}-discrepancy`, performanceDiscrepancy);
// 		});

// 	} catch (error) {
// 		logError({ error, message: "FAILED" });
// 	}
// };

// main();
