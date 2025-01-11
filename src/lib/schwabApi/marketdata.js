const callApi = require("./callApi");

const queryPriceHistory = (params) => {
	return callApi({
		method: "get",
		path: "/marketdata/v1/pricehistory",
		urlQueryParams: params
	});
};

module.exports = {
	queryPriceHistory
};
