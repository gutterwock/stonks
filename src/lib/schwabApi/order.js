const callApi = require("./callApi");

const getOrders = ({ accountNumber, from, status, to }) => {
	return callApi({
		method: "get",
		path: "/trader/v1/" + (accountNumber ? `accounts/${accountNumber}/orders` : "orders"),
		urlQueryParams: {
			fromEnteredTime: from,
			toEnteredTime: to,
			status
		}
	});
};

const cancelOrder = ({ accountNumber, orderId }) => {
	return callApi({
		method: "delete",
		path: `/trader/v1/accounts/${accountNumber}/orders/${orderId}`,
	});
};

// TODO: add validation
const presetEquityLimitOrder = ({ instruction, price, quantity, symbol }) => {
	return {
		orderType: "LIMIT", 
		session: "NORMAL", 
		price,
		duration: "DAY", 
		orderStrategyType: "SINGLE", 
		orderLegCollection: [{ 
			instruction, 
			quantity, 
			instrument: { 
			 symbol, 
			 assetType: "EQUITY" 
			} 
		}] 
	}
};

const createOrder = ({ accountNumber, orderData }) => {
	return callApi({
		method: "post",
		path: `/trader/v1/accounts/${accountNumber}/orders`,
		data: orderData
	});
};

module.exports = {
	cancelOrder,
	createOrder,
	getOrders,
};
