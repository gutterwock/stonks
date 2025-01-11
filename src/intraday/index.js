const { queryPriceHistory } = require("../lib/schwabApi/marketdata");
const { logError } = require("../lib/utils/logger");

const main = async () => {
	try {
		const symbol = "QQQ";

		const { data } = await queryPriceHistory({
			symbol,
			periodType: "day",
			period: 1,
			frequencyType: "minute",
			frequency: 30,
			startDate: 0,
			endDate: Date.now()
		});
	
	} catch (error) {
		logError({ error, message: "FAILED" });
	}
};

main();