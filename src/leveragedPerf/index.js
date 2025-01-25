const { queryPriceHistory } = require("../lib/schwabApi/marketdata");
const { logError } = require("../lib/utils/logger");
const { loadFromLocal, saveToLocal } = require("../lib/utils/localData");

const main = async () => {
	try {
	} catch (error) {
		logError({ error, message: "FAILED" });
	}
};

main();