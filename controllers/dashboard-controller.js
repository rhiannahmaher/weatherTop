import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { reportAnalytics } from "../utils/report-analytics.js";
import { reportStore } from "../models/report-store.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);

    // For-of loop to gather reports for each station 
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
    for (const station of stations) { 
      const reports = await reportStore.getReportsByStationId(station._id);
      station.reports = reports;

      station.minTemp = reportAnalytics.getMinTemp(station);
      station.maxTemp = reportAnalytics.getMaxTemp(station);
      station.minSpeed = reportAnalytics.getMinSpeed(station);
      station.maxSpeed = reportAnalytics.getMaxSpeed(station);
      station.minPressure = reportAnalytics.getMinPressure(station);
      station.maxPressure = reportAnalytics.getMaxPressure(station);

      station.latestReport = reportAnalytics.getLatestReport(station); 
      station.windDirection = reportAnalytics.getWindDirection(station);
      station.fahrenheitTemp = reportAnalytics.convertCelciusToFahrenheit(station);
      station.weatherCodeDescription = reportAnalytics.getWeatherCodeDescription(station);
      station.weatherCodeIcon = reportAnalytics.getWeatherCodeIcon(station);

      // Adds current weather to station summary
      if (station.latestReport) { 
        station.currentTemp = station.latestReport.temperature;
        station.currentSpeed = station.latestReport.windSpeed;
        station.currentPressure = station.latestReport.pressure;
        
        station.currentTempWithUnit = reportAnalytics.getCurrentTemp(station.currentTemp, "°C");
        station.currentSpeedWithUnit = reportAnalytics.getCurrentSpeed(station.currentSpeed, "m/s");
        station.currentPressureWithUnit = reportAnalytics.getCurrentPressure(station.currentPressure, "hPa");
      } 
      // Accounts for if there are no reports
      else {
        station.currentTempWithUnit = "No Data";
        station.currentSpeedWithUnit = "No Data";
        station.currentPressureWithUnit = "No Data";
      }
    }
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stations, 
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },

  // Adds station to Dashboard. Capitalizes first letter of station title
  // Reference: https://www.shecodes.io/athena/3710-how-to-capitalize-the-first-letter-in-a-string-with-javascript#:~:text=Using%20JavaScript%2C%20you%20can%20capitalize,with%20the%20toUpperCase()%20method.
  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stationTitle = request.body.title;
    const title = stationTitle.charAt(0).toUpperCase() + stationTitle.slice(1);
    const newStation = {
      title: title,
      userid: loggedInUser._id,
      longitude: Number(request.body.longitude),
      latitude: Number(request.body.latitude),
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  // Sorts stations alphabetically
  async sortStations(request, response) {
    const userid = request.params.userid; 
    const stations = await stationStore.getStationsByUserId(userid);
    response.render("station-view", stations);
  },
  
  // Deletes stations & reports attached to station
  async deleteStation(request, response) {
    const stationId = request.params.id;  
    console.log(`deleting Station ${stationId}`);
    await reportStore.deleteAllReports(stationId); 
    await stationStore.deleteStationById(stationId); // Deletes reports associated with station id first, followed by station
    response.redirect("/dashboard");
  }
}