const callApi = require("./callApi");

const getAccountsBalances = () => {
	return callApi({
		method: "get",
		path: "/trader/v1/accounts",
		urlQueryParams: { fields: "positions" }
	});
};

const getAccountNumbers = () => {
	return callApi({
		method: "get",
		path: "/trader/v1/accounts/accountNumbers",
	});
};


module.exports = {
	getAccountsBalances,
	getAccountNumbers,
};
