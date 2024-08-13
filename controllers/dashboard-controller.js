// this might be able to be renamed station-controller - look into if a separate controller file is needed for this

import { stationStore } from "../models/station-store.js";
import { accountsController } from "./accounts-controller.js";

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

async index(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: await stationStore.getStationsByUserId(loggedInUser._id),
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
...
  async addPlaylist(request, response) {
    const loggedInUser = await accountsController.getLoggedInUser(request);
    const newPlayList = {
      title: request.body.title,
      userid: loggedInUser._id,
    };
    console.log(`adding playlist ${newPlayList.title}`);
    await playlistStore.addPlaylist(newPlayList);
    response.redirect("/dashboard");
  },