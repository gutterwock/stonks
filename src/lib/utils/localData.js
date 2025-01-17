const fs = require("fs");
const { logError, logInfo } = require("./logger");

const saveToLocal = (filename, data) => {
	try {
		fs.writeFileSync(`./tmp/${filename}.json`, JSON.stringify(data, null, 2));
		logInfo({ message: `Saved data to ./tmp/${filename}.json` });
	} catch (error) {
		logError({ error });
	}
};

const loadFromLocal = (filename) => {
	try {
		return fs.readFileSync(`./tmp/${filename}.json`);
	} catch (error) {
		logError({ error });
		throw error;
	}
};

module.exports = {
	loadFromLocal,
	saveToLocal
};
