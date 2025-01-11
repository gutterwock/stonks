const axios = require("axios");
const { logError } = require("../utils/logger");
const { accessToken, tokenType } = require("../../../config/token.json");

const BASE_URL = "https://api.schwabapi.com";

const callApi = async ({
	data,
	name,
	method = "get",
	path,
	urlQueryParams
}) => {
	try {
		const queryStr = urlQueryParams && Object.keys(urlQueryParams)
			.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(urlQueryParams[key])}`)
			.join("&");
		const url = BASE_URL + path + (queryStr ? "?" + queryStr : "");
		return await axios({
			method,
			url,
			data,
			headers: {
				authorization: `${tokenType} ${accessToken}`
			}
		});
	} catch (error) {
		logError({ error, message: `Failed to ${method} ${name || path}:` + error.message });
		throw error;
	}
};

module.exports = callApi;
