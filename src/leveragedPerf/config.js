module.exports = {
	fileKey: "leveragedPerfDiscrepency",
	etfExpectedPerformance: {
		SQQQ: -3,
		QID: -2,
		QQQ: 1,
		QLD: 2,
		TQQQ: 3
	},
	frequencies: {
		month: {
			periodType: "year",
			period: 1,
			frequencyType: "monthly",
			frequency: 1
		},
		week: {
			periodType: "year",
			period: 1,
			frequencyType: "weekly",
			frequency: 1
		},
		day: {
			periodType: "year",
			period: 1,
			frequencyType: "daily",
			frequency: 1
		},
		halfHour: {
			periodType: "day",
			period: 1,
			frequencyType: "minute",
			frequency: 30
		},
		quarterHour: {
			periodType: "day",
			period: 1,
			frequencyType: "minute",
			frequency: 15
		}
	}
};
