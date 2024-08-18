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

    // add min and max for wind and pressure
};