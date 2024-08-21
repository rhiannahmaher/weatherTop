import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { reportAnalytics } from "../utils/report-analytics.js";

export const stationController = {
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    const minTemp = reportAnalytics.getMinTemp(station);
    const maxTemp = reportAnalytics.getMaxTemp(station);
    const minSpeed = reportAnalytics.getMinSpeed(station);
    const maxSpeed = reportAnalytics.getMaxSpeed(station);
    const minPressure = reportAnalytics.getMinPressure(station);
    const maxPressure = reportAnalytics.getMaxPressure(station);

    const viewData = {
      title: "Station", // controls name on chrome tab - want to change to station.tt=itle
      station: station,
      minTemp: minTemp,
      maxTemp: maxTemp,
      minSpeed: minSpeed,
      maxSpeed: maxSpeed,
      minPressure: minPressure,
      maxPressure: maxPressure,
    };
    response.render("station-view", viewData);
  },
  
   async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`adding report ${newReport.title}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },
  
  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(request.params.reportId);
    response.redirect("/station/" + stationId);
  },
};