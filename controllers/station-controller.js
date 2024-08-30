import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import { reportAnalytics } from "../utils/report-analytics.js";
import dayjs from 'dayjs'; // ref
import axios from "axios";

export const stationController = {

  async index(request, response) {
        const station = await stationStore.getStationById(request.params.id);

        // Retrieves 5-day weather forecast from openWeather
        let forecast = {};
        const city = station.title;
        const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=88b0f3b6a4a702ccaa37e880cde9b82f`;
        const result = await axios.get(weatherRequestUrl);
        if (result.status === 200) {
          forecast.tempTrend = [];
          forecast.trendLabels = [];
          const trends = result.data.list;
          for (let i=0; i<10; i++) {
            forecast.tempTrend.push(trends[i].main.temp);
            forecast.trendLabels.push(trends[i].dt_txt);
          }
        }

        // Retrieves report analytics from submitted reports
        const minTemp = reportAnalytics.getMinTemp(station);
        const maxTemp = reportAnalytics.getMaxTemp(station);
        const minSpeed = reportAnalytics.getMinSpeed(station);
        const maxSpeed = reportAnalytics.getMaxSpeed(station);
        const minPressure = reportAnalytics.getMinPressure(station);
        const maxPressure = reportAnalytics.getMaxPressure(station);

        const windDirection = reportAnalytics.getWindDirection(station);
        const fahrenheitTemp = reportAnalytics.convertCelciusToFahrenheit(station);
        const weatherCodeDescription = reportAnalytics.getWeatherCodeDescription(station);
        const weatherCodeIcon = reportAnalytics.getWeatherCodeIcon(station);
        
        const latestReport = reportAnalytics.getLatestReport(station); // Retrieves latest report added 
        
        let currentTempWithUnit = "No Data"; 
        let currentSpeedWithUnit = "No Data";
        let currentPressureWithUnit = "No Data";

        if (latestReport) { // Accounts for if reports are empty
            const currentTemp = latestReport.temperature;
            const currentSpeed = latestReport.windSpeed;
            const currentPressure = latestReport.pressure;

            currentTempWithUnit = reportAnalytics.getCurrentTemp(currentTemp, "°C");
            currentSpeedWithUnit = reportAnalytics.getCurrentSpeed(currentSpeed, "kMh");
            currentPressureWithUnit = reportAnalytics.getCurrentPressure(currentPressure, "hPa");
        }
        const viewData = {
            title: station.title,
            station: station,
            minTemp: minTemp,
            maxTemp: maxTemp,
            minSpeed: minSpeed,
            maxSpeed: maxSpeed,
            minPressure: minPressure,
            maxPressure: maxPressure,

            latestReport: latestReport,
            currentTempWithUnit: currentTempWithUnit,
            currentSpeedWithUnit: currentSpeedWithUnit,
            currentPressureWithUnit: currentPressureWithUnit,

            windDirection: windDirection,
            fahrenheitTemp: fahrenheitTemp,
            weatherCodeDescription: weatherCodeDescription,
            weatherCodeIcon: weatherCodeIcon,
            
            forecast: forecast, 
        };
        console.log("station rendering");
        response.render("station-view", viewData);
},
/*
  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const minTemp = reportAnalytics.getMinTemp(station);
    const maxTemp = reportAnalytics.getMaxTemp(station);
    const minSpeed = reportAnalytics.getMinSpeed(station);
    const maxSpeed = reportAnalytics.getMaxSpeed(station);
    const minPressure = reportAnalytics.getMinPressure(station);
    const maxPressure = reportAnalytics.getMaxPressure(station);

    const windDirection = reportAnalytics.getWindDirection(station);
    const fahrenheitTemp = reportAnalytics.convertCelciusToFahrenheit(station);
    const weatherCodeDescription = reportAnalytics.getWeatherCodeDescription(station);
    const weatherCodeIcon = reportAnalytics.getWeatherCodeIcon(station);
    
    const latestReport = reportAnalytics.getLatestReport(station); // Retrieves latest report added 
    
    let currentTempWithUnit = "No Data"; 
    let currentSpeedWithUnit = "No Data";
    let currentPressureWithUnit = "No Data";

    if (latestReport) { // Accounts for if reports are empty
      const currentTemp = latestReport.temperature;
      const currentSpeed = latestReport.windSpeed;
      const currentPressure = latestReport.pressure;

      currentTempWithUnit = reportAnalytics.getCurrentTemp(currentTemp, "°C");
      currentSpeedWithUnit = reportAnalytics.getCurrentSpeed(currentSpeed, "kMh");
      currentPressureWithUnit = reportAnalytics.getCurrentPressure(currentPressure, "hPa");
    }

    const viewData = {
      title: station.title,
      station: station,
      minTemp: minTemp,
      maxTemp: maxTemp,
      minSpeed: minSpeed,
      maxSpeed: maxSpeed,
      minPressure: minPressure,
      maxPressure: maxPressure,

      latestReport: latestReport,
      currentTempWithUnit: currentTempWithUnit,
      currentSpeedWithUnit: currentSpeedWithUnit,
      currentPressureWithUnit: currentPressureWithUnit,

      windDirection: windDirection,
      fahrenheitTemp: fahrenheitTemp,
      weatherCodeDescription: weatherCodeDescription,
      weatherCodeIcon : weatherCodeIcon,
    };
    response.render("station-view", viewData);
    console.log("station rendering")
  },
  */

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const city = station.title;

    if (request.body.autoGenerate === "false") {
      // Manually generate report
      const newReport = {
        time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        code: Number(request.body.code),
        temperature: Number(request.body.temperature),
        windSpeed: Number(request.body.windSpeed),
        windDirection: Number(request.body.windDirection),
        pressure: Number(request.body.pressure),
      };
      console.log(`adding report to Station ${station._id}`);
      await reportStore.addReport(station._id, newReport);
      response.redirect("/station/" + station._id);
    } 
    else {
      // Auto generate report
      console.log("auto-generating new report");
      let generatedReport = {};
      const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=88b0f3b6a4a702ccaa37e880cde9b82f`; 
      const result = await axios.get(weatherRequestUrl);

      if (result.status === 200) {
        const currentWeather = result.data;
        generatedReport = {
          latitude: currentWeather.coord.lat, 
          longitude: currentWeather.coord.lon,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          code: currentWeather.weather[0].id, 
          temperature: currentWeather.main.temp,
          windSpeed: currentWeather.wind.speed,
          windDirection: currentWeather.wind.deg,
          pressure: currentWeather.main.pressure,
        };
        await reportStore.addReport(station._id, generatedReport); // Auto generated report is added to report-store
        response.redirect("/station/" + station._id);
      }
    }
  },
  
  /*

  async addForecast(request, response) {
    try {
        console.log("Rendering 5-day forecast");

        // Fetch station details
        const station = await stationStore.getStationById(request.params.id);
        const city = station.title;

        // Fetch weather data from API
        const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=88b0f3b6a4a702ccaa37e880cde9b82f`;
        const result = await axios.get(weatherRequestUrl);

        if (result.status === 200) {
            // Log the full API response for debugging
            console.log(JSON.stringify(result.data, null, 2));
            
            // Set report to the fetched data
            const report = result.data;

            // Prepare view data
            const viewData = {
                title: "5 Day Forecast",
                reading: report, // Use the API data here
            };

            // Render the view
            response.render("station-view", viewData);
        } else {
            console.error("Failed to fetch forecast data. Status code:", result.status);
            response.status(result.status).send("Error fetching forecast data");
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
        response.status(500).send("Internal Server Error");
    }
},
*/

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`deleting report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId);
    response.redirect("/station/" + stationId);
  },
};