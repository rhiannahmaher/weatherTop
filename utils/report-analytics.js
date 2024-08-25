export const reportAnalytics = {

    getMinTemp(station) {

        if (!station.reports) {
            return "No Data";
        }

        let minTemp = station.reports[0]; // had to change from null as it was causing error
        if (station.reports.length > 0) {
            minTemp = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].temperature < minTemp.temperature) {
                minTemp = station.reports[i];
                }
            }
        }

        if (minTemp && minTemp.temperature !== undefined) { // accounts for if there are no reports
            return `${minTemp.temperature}°C`;
        } else {
            return "No Data"; 
        }
    },

    getMaxTemp(station) {

        if (!station.reports) {
            return "No Data";
        }
        
        let maxTemp = station.reports[0];
        if (station.reports.length > 0) {
            maxTemp = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].temperature > maxTemp.temperature) {
                maxTemp = station.reports[i];
                }
            }
        }

        if (maxTemp && maxTemp.temperature !== undefined) {
            return `${maxTemp.temperature}°C`;
        } else {
            return "No Data"; 
        }
    },

    getMinSpeed(station) {

        if (!station.reports) {
            return "No Data";
        }

        let minSpeed = station.reports[0];
        if (station.reports.length > 0) {
            minSpeed = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].windSpeed < minSpeed.windSpeed) {
                minSpeed = station.reports[i];
                }
            }
        }

        if (minSpeed && minSpeed.windSpeed !== undefined) {
            return `${minSpeed.windSpeed} kMh`;
        } else {
            return "No Data"; 
        }
    },

    getMaxSpeed(station) {

        if (!station.reports) {
            return "No Data";
        }

        let maxSpeed = station.reports[0];
        if (station.reports.length > 0) {
            maxSpeed = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].windSpeed > maxSpeed.windSpeed) {
                maxSpeed = station.reports[i];
                }
            }
        }

        if (maxSpeed && maxSpeed.windSpeed !== undefined) {
            return `${maxSpeed.windSpeed} kMh`;
        } else {
            return "No Data"; 
        }
    },

    getMinPressure(station) {

        if (!station.reports) {
            return "no data";
        }

        let minPressure = station.reports[0];
        if (station.reports.length > 0) {
            minPressure = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].pressure < minPressure.pressure) {
                minPressure = station.reports[i];
                }
            }
        }

        if (minPressure && minPressure.pressure !== undefined) {
            return `${minPressure.pressure} hPa`;
        } else {
            return "No Data"; 
            
        }
    },

    getMaxPressure(station) {

        if (!station.reports) {
            return "No data";
        }

        let maxPressure = station.reports[0];
        if (station.reports.length > 0) {
            maxPressure = station.reports[0];
            for (let i = 1; i < station.reports.length; i++) {
                if (station.reports[i].pressure > maxPressure.pressure) {
                maxPressure = station.reports[i];
                }
            }
        }

        if (maxPressure && maxPressure.pressure !== undefined) {
            return `${maxPressure.pressure} hPa`;
        } else {
            return "No Data"; 
        }
    },

    getLatestReport(station) {

        if (!station.reports) {
            return null;
        }

        let latestReport = station.reports[0];
        if (station.reports.length > 0) {
            latestReport = station.reports[0];
    
            // For loop to compare times of reports and returns most recent
            for (const report of station.reports) {
                if (new Date(report.time) > new Date(latestReport.time)) { // ref function
                    latestReport = report;
                }
            }
        }

        if (latestReport !== undefined) {
            return latestReport;
        } else {
            return null; 
        }
    },

    getCurrentTemp(currentTemp, unit) {
        return `${currentTemp}${unit}`;
    },

    getCurrentSpeed(currentSpeed, unit) {
        return `${currentSpeed} ${unit}`;
    },

    getCurrentPressure(currentPressure, unit) {
        return `${currentPressure} ${unit}`;
    },

    getWindDirection(station) {

        if (!station.reports) { // Accounts for if there is no report
            return null;
        }
    
        let latestReport = station.reports[0];
    
        for (const report of station.reports) { //ref report of station.reports
            if (new Date(report.time) > new Date(latestReport.time)) { // ref function
                latestReport = report;
            }
        }

       if (!latestReport) { // Aclso account for if there is no report/"latest report"
         return null; 
       }
    
        let degrees = latestReport.windDirection;


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

        return 'Unknown direction'; 
    },

    convertCelciusToFahrenheit(station) {

        if (!station.reports) {
            return "No Data";
        }

        let latestReport = station.reports[0];
        for (const report of station.reports) {
            if (new Date(report.time) > new Date(latestReport.time)) { // ref function
                latestReport = report;
            }
        }

        if (latestReport) {
            const fahrenheitTemp = (latestReport.temperature * 9/5) + 32;
            return `${fahrenheitTemp}°F`; 
        } else {
            return "No Data";
        }
    },

    getWeatherCodeDescription(station) {

        if (!station.reports) {
            return null; // Return a default message if no reports are available
        }

        let latestReport = station.reports[0];

        for (const report of station.reports) {
            if (new Date(report.time) > new Date(latestReport.time)) { // ref function
                latestReport = report;
            }
        }

        if (!latestReport) {
            return null; // Return a default message if weather code is not available
        }

        let weatherCodeDescription = latestReport.code;
        
        if (weatherCodeDescription == 200) {
            return 'Thunderstorm with light rain';
        } else if (weatherCodeDescription == 201) {
            return 'Thunderstorm with rain';
        } else if (weatherCodeDescription == 202) {
            return 'Thunderstorm with heavy rain';
        } else if (weatherCodeDescription == 210) {
            return 'Light thunderstorm';
        } else if (weatherCodeDescription == 211) {
            return 'Thunderstorm';
        } else if (weatherCodeDescription == 212) {
            return 'Heavy thunderstorm';
        } else if (weatherCodeDescription == 221) {
            return 'Ragged thunderstorm';
        } else if (weatherCodeDescription == 230) {
            return 'Thunderstorm with light drizzle';
        } else if (weatherCodeDescription == 231) {
            return 'Thunderstorm with drizzle';
        } else if (weatherCodeDescription == 232) {
            return 'Thunderstorm with heavy drizzle';
        } else if (weatherCodeDescription == 300) {
            return 'Light intensity drizzle';
        } else if (weatherCodeDescription == 301) {
            return 'Drizzle';
        } else if (weatherCodeDescription == 302) {
            return 'Heavy intensity drizzle';
        } else if (weatherCodeDescription == 310) {
            return 'Light intensity drizzle rain';
        } else if (weatherCodeDescription == 311) {
            return 'Drizzle rain';
        } else if (weatherCodeDescription == 312) {
            return 'Heavy intensity drizzle rain';
        } else if (weatherCodeDescription == 313) {
            return 'Shower rain and drizzle';
        } else if (weatherCodeDescription == 314) {
            return 'Heavy shower rain and drizzle';
        } else if (weatherCodeDescription == 321) {
            return 'Shower drizzle';
        } else if (weatherCodeDescription == 500) {
            return 'Light rain';
        } else if (weatherCodeDescription == 501) {
            return 'Moderate rain';
        } else if (weatherCodeDescription == 502) {
            return 'Heavy intensity rain';
        } else if (weatherCodeDescription == 503) {
            return 'Very heavy rain';
        } else if (weatherCodeDescription == 504) {
            return 'Extreme rain';
        } else if (weatherCodeDescription == 511) {
            return 'Freezing rain';
        } else if (weatherCodeDescription == 520) {
            return 'Light intensity shower rain';
        } else if (weatherCodeDescription == 521) {
            return 'Shower rain';
        } else if (weatherCodeDescription == 522) {
            return 'Heavy intensity shower rain';
        } else if (weatherCodeDescription == 531) {
            return 'Ragged shower rain';
        } else if (weatherCodeDescription == 600) {
            return 'Light snow';
        } else if (weatherCodeDescription == 601) {
            return 'Snow';
        } else if (weatherCodeDescription == 602) {
            return 'Heavy snow';
        } else if (weatherCodeDescription == 611) {
            return 'Sleet';
        } else if (weatherCodeDescription == 612) {
            return 'Light shower sleet';
        } else if (weatherCodeDescription == 613) {
            return 'Shower snow';
        } else if (weatherCodeDescription == 615) {
            return 'Light rain and snow';
        }else if (weatherCodeDescription == 616) {
            return 'Rain and snow';
        } else if (weatherCodeDescription == 620) {
            return 'Light shower snow';
        } else if (weatherCodeDescription == 621) {
            return 'Shower snow';
        } else if (weatherCodeDescription == 622) {
            return 'Heavy shower snow';
        } else if (weatherCodeDescription == 701) {
            return 'Mist';
        } else if (weatherCodeDescription == 711) {
            return 'Smoke';
        } else if (weatherCodeDescription == 721) {
            return 'Haze';
        } else if (weatherCodeDescription == 731) {
            return 'Sand/Dust whirls';
        } else if (weatherCodeDescription == 741) {
            return 'Fog';
        } else if (weatherCodeDescription == 751) {
            return 'Sand';
        } else if (weatherCodeDescription == 761) {
            return 'Dust';
        } else if (weatherCodeDescription == 762) {
            return 'Volcanic ash';
        } else if (weatherCodeDescription == 771) {
            return 'Squalls';
        } else if (weatherCodeDescription == 781) {
            return 'Tornado';
        } else if (weatherCodeDescription == 800) {
            return 'Clear sky';
        } else if (weatherCodeDescription == 801) {
            return 'Few clouds';
        } else if (weatherCodeDescription == 802) {
            return 'Scattered clouds';
        } else if (weatherCodeDescription == 803) {
            return 'Broken clouds';
        } else if (weatherCodeDescription == 804) {
            return 'Overcast clouds';
        } 
    },

    getWeatherCodeIcon(station) {

        if (!station.reports) {
            return null; 
        }

        let latestReport = station.reports[0];

        for (const report of station.reports) {
            if (new Date(report.time) > new Date(latestReport.time)) { // ref function
                latestReport = report;
            }
        }

        if (!latestReport) {
            return null; 
        }

        let weatherCodeIcon = latestReport.code; // ref

        switch (weatherCodeIcon) {
            case 200:
            case 201:
            case 202:
            case 210:
            case 211:
            case 212:
            case 221:
            case 230:
            case 231:
            case 232:
                return 'https://openweathermap.org/img/wn/11d@2x.png';
            case 300:
            case 301:
            case 302:
            case 310:
            case 311:
            case 312:
            case 313:
            case 314:
            case 321:
            case 520:
            case 521:
            case 522:
            case 531:
                return 'https://openweathermap.org/img/wn/09d@2x.png';
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
                return 'https://openweathermap.org/img/wn/10d@2x.png';
            case 511:
            case 600:
            case 601:
            case 602:
            case 611:
            case 612:
            case 613:
            case 615:
            case 616:
            case 620:
            case 621:
            case 622:
                return 'https://openweathermap.org/img/wn/13d@2x.png';
            case 701:
            case 711:
            case 721:
            case 731:
            case 741:
            case 751:
            case 761:
            case 762:
            case 771:
            case 781:
                return 'https://openweathermap.org/img/wn/50d@2x.png';
            case 800:
                return 'https://openweathermap.org/img/wn/01d@2x.png';
            case 801:
                return 'https://openweathermap.org/img/wn/02d@2x.png';
            case 802:
                return 'https://openweathermap.org/img/wn/03d@2x.png';
            case 803:
            case 804:
                return 'https://openweathermap.org/img/wn/04d@2x.png';
        }
    }
 };