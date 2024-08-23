import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { reportAnalytics } from "../utils/report-analytics.js";
import dayjs from 'dayjs'; // ref

export const stationController = {
  
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);

    const minTemp = reportAnalytics.getMinTemp(station);
    const maxTemp = reportAnalytics.getMaxTemp(station);
    const minSpeed = reportAnalytics.getMinSpeed(station);
    const maxSpeed = reportAnalytics.getMaxSpeed(station);
    const minPressure = reportAnalytics.getMinPressure(station);
    const maxPressure = reportAnalytics.getMaxPressure(station);
    const latestReport = reportAnalytics.getLatestReport(station); //gets latest report added - works as expected
    const windDirection = reportAnalytics.getWindDirection(station);
    const fahrenheitTemp = reportAnalytics.convertCelciusToFahrenheit(station);

    const viewData = {
      title: "Station", // controls name on chrome tab - want to change to station.tt=itle
      station: station,
      minTemp: minTemp,
      maxTemp: maxTemp,
      minSpeed: minSpeed,
      maxSpeed: maxSpeed,
      minPressure: minPressure,
      maxPressure: maxPressure,
      latestReport: latestReport,
      windDirection: windDirection,
      fahrenheitTemp: fahrenheitTemp,
    };
    response.render("station-view", viewData);;
  },

  async sortStations(request, response) {
    const userid = request.params.userid; 
    const stations = await stationStore.getStationsByUserId(userid);
    response.render('station-view', stations);
  },

   async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`Adding report to Station ${station._id}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },
  
  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
  },
};