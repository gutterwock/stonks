const { fileKey, etfExpectedPerformance, frequencies } = require("./config");

const { loadFromLocal, saveToLocal } = require("../lib/utils/localData");
const { logError, logInfo } = require("../lib/utils/logger");

const main = async () => {
	try {
		Object.keys(frequencies).forEach((frequency) => {
			const basePerformance = loadFromLocal(`${fileKey}-QQQ-${frequency}-performance`);
			const performanceDiscrepancy = Object.fromEntries(Object.keys(basePerformance).map((timestamp) => [timestamp, {}]));
			Object.keys(etfExpectedPerformance).forEach((symbol) => {
				const performance = loadFromLocal(`${fileKey}-${symbol}-${frequency}-performance`);
				Object.keys(performance).forEach((timestamp) => {
					const basePerformanceAtDate = basePerformance[timestamp];
					if (basePerformanceAtDate) {
						performanceDiscrepancy[timestamp][symbol] = ((performance[timestamp] / basePerformanceAtDate) / etfExpectedPerformance[symbol]) - 1
					}
				});
			})
			saveToLocal(`${fileKey}-${frequency}-discrepancy`, performanceDiscrepancy);
		});

	} catch (error) {
		logError({ error, message: "FAILED" });
	}
};

main();
