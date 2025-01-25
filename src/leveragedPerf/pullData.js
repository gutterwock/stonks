const { fileKey, etfExpectedPerformance, frequencies } = require("./config");
const { queryPriceHistory } = require("../lib/schwabApi/marketdata");
const { saveToLocal } = require("../lib/utils/localData");
const { logError, logInfo } = require("../lib/utils/logger");

const pullData = async () => {
	logInfo({ message: "Pulling price data..." })
	const parameterSets = Object.keys(etfExpectedPerformance).map((symbol) => {
		return Object.keys(frequencies).map((frequency) => {
			return [
				`${fileKey}-${symbol}-${frequency}`,
				{
					...frequencies[frequency],
					startDate: 0,
					endDate: Date.now(),
					symbol,
				}
			];
		})
	}).flat();

	await Promise.all(parameterSets.map(async ([fileName, parameters]) => {
		try {
			const { data } = await queryPriceHistory(parameters);
			saveToLocal(fileName, data);
		} catch (error) {
			logError({ error, message: `Failed to pull data for ${symbol}: ${error.message}`});
		}
	}));
};

pullData();