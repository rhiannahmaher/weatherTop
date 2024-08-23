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

    getLatestReport(station) {
        let latestReport = null;
    
        if (station.reports.length > 0) {
            latestReport = station.reports[0];
    
            // For loop to compare times of reports and returns most recent
            for (const report of station.reports) {
                if (new Date(report.time) > new Date(latestReport.time)) {
                    latestReport = report;
                }
            }
        }
        return latestReport;
    },

    getWindDirection(station) {
        let windDirection = null;
    
        if (station.reports.length > 0) {
            windDirection = station.reports[0];
            let degrees = null;
    
            // For loop to compare times of reports and returns most recent
            for (const report of station.reports) {
                if (new Date(report.time) > new Date(windDirection.time)) {
                    windDirection = report;

                    if (degrees >= 337.5 || degrees < 22.5) {
                        return 'North';
                    } else if (degrees >= 22.5 && degrees < 67.5) {
                        return 'North East';
                    } else if (degrees >= 67.5 && degrees < 112.5) {
                        return 'East';
                    } else if (degrees >= 112.5 && degrees < 157.5) {
                        return 'South East';
                    } else if (degrees >= 157.5 && degrees < 202.5) {
                        return 'South';
                    } else if (degrees >= 202.5 && degrees < 247.5) {
                        return 'South West';
                    } else if (degrees >= 247.5 && degrees < 292.5) {
                        return 'West';
                    } else if (degrees >= 292.5 && degrees < 337.5) {
                        return 'North West';
                    }

                }
            }
        }
        return windDirection;
    },
};