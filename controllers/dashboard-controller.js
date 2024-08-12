import { stationStore } from "../models/station-store.js";

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "WeatherTop Dashboard", // might chnge to "station dashborad"
      stations: await stationStore.getAllStations(), // lists playlists
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
  
  async addStation(request, response) {
    const newStation = {
      title: request.body.title,
    };
    console.log(`adding station ${newStation.title}`);
    await stationStore.addStation(newStation); // statement to add playlist
    response.redirect("/dashboard");
  },
};