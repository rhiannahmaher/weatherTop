import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";
import { reportAnalytics } from "../utils/report-analytics.js";
import { reportStore } from "../models/report-store.js";

export const dashboardController = {
  async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const stations = await stationStore.getStationsByUserId(loggedInUser._id);

    // For loop to gather reports for each station
    for (const station of stations) { // ref
      const reports = await reportStore.getReportsByStationId(station._id);
      station.reports = reports;

      station.minTemp = reportAnalytics.getMinTemp(station);
      station.maxTemp = reportAnalytics.getMaxTemp(station);
      station.minSpeed = reportAnalytics.getMinSpeed(station);
      station.maxSpeed = reportAnalytics.getMaxSpeed(station);
      station.minPressure = reportAnalytics.getMinPressure(station);
      station.maxPressure = reportAnalytics.getMaxPressure(station);
    }

    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stations, 
    };
    
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
    console.log(viewData);
  },

  async addStation(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newStation = {
      title: request.body.title,
      userid: loggedInUser._id,
      longitude: Number(request.body.longitude),
      latitude: Number(request.body.latitude),
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation);
    response.redirect("/dashboard");
  },
  
  async deleteStation(request, response) {
    const stationId = request.params.id;
    console.log(`Deleting Station ${stationId}`);
    await stationStore.deleteStationById(stationId);
    response.redirect("/dashboard");
  },
};