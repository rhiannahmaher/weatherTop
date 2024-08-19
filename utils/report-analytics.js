export const reportAnalytics = {

    getMinTemp(station) {
        let minTemp = null;
        if (station.reports.length > 0) {
            minTemp = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].temperature < minTemp.temperature) {
                minTemp = station.reports[i];
                }
            }
        }
        return minTemp;
    },

    getMaxTemp(station) {
        let maxTemp = null;
        if (station.reports.length > 0) {
            maxTemp = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].temperature > maxTemp.temperature) {
                maxTemp = station.reports[i];
                }
            }
        }
        return maxTemp;
    },

    getMinSpeed(station) {
        let minSpeed = null;
        if (station.reports.length > 0) {
            minSpeed = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].windSpeed < minSpeed.windSpeed) {
                minSpeed = station.reports[i];
                }
            }
        }
        return minSpeed;
    },

    getMaxSpeed(station) {
        let maxSpeed = null;
        if (station.reports.length > 0) {
            maxSpeed = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].windSpeed > maxSpeed.windSpeed) {
                maxSpeed = station.reports[i];
                }
            }
        }
        return maxSpeed;
    },

    getMinPressure(station) {
        let minPressure = null;
        if (station.reports.length > 0) {
            minPressure = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].pressure < minPressure.pressure) {
                minPressure = station.reports[i];
                }
            }
        }
        return minPressure;
    },

    getMaxPressure(station) {
        let maxPressure = null;
        if (station.reports.length > 0) {
            maxPressure = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].pressure > maxPressure.pressure) {
                maxPressure = station.reports[i];
                }
            }
        }
        return maxPressure;
    },
};