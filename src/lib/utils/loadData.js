const fs = require("fs");

const getFileExtension = (fileName) => {
	const parts = fileName.split(".");
	return parts[parts.length - 1];
};

const loadData = async ({ source, destination, accessParams }) => {
	switch (source) {
		case "FILE":
			const { files } = accessParams;
			switch (destination) {
				case "MEMORY":
					const data = {};
					Object.keys(files).forEach((symbol) => {
						const fileName = files[symbol];
						const fileContents = fs.readFileSync(fileName);
						switch (getFileExtension(fileName).toLowerCase()) {
							case "json":
								data[symbol] = JSON.parse(fileContents);
								break;
							default:
								data[symbol] = fileContents;
						}
					});
					return data;
				case "CACHE":
					throw new Error("Not yet implemented");
			}
		case "DB":
			throw new Error("Not yet implemented");
		default:
			throw new Error("Specify a source");
	}
};

module.exports = {
	loadData
};
