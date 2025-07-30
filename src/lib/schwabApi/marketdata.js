const callApi = require("./callApi");

const queryPriceHistory = (params) => {
	return callApi({
		method: "get",
		path: "/marketdata/v1/pricehistory",
		urlQueryParams: params
	});
};

const getQuotes = (symbols = [], fields = ["quote"]) => {
	return callApi({
		method: "get",
		path: "/marketdata/v1/quotes",
		urlQueryParams: {
			symbols: symbols.join(","),
			fields: fields.join(",")
		}
	});
};

module.exports = {
	getQuotes,
	queryPriceHistory
};
