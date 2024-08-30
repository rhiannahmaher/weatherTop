import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import { reportStore } from "./report-store.js";

const db = initStore("stations");

export const stationStore = {
  async getAllStations() {
    await db.read();
    return db.data.stations;
  },

  async addStation(station) {
    await db.read();
    station._id = v4();
    db.data.stations.push(station);
    await db.write();
    return station;
  },

  async getStationById(id) {
    await db.read();
    const list = db.data.stations.find((station) => station._id === id);
    list.reports = await reportStore.getReportsByStationId(list._id);
    return list;
  },

  // Retrieves stations bu user id and sorts alphabetcially
  async getStationsByUserId(userid) { 
    await db.read();
    const stationsByUserId = db.data.stations.filter((station) => station.userid === userid); 

    const sortedStations = stationsByUserId.sort((a, b) => { // ref function
      if (a.title < b.title) { // if "a" comes before "b"
        return -1;
       }  
      if (a.title > b.title) { // if "b" comes before "a"
        return 1;
        } 
      return 0; // if "a" and "b" are equal
    });
    return sortedStations; 
  },

  async deleteStationById(id) {
    await db.read();
    const index = db.data.stations.findIndex((station) => station._id === id);
    db.data.stations.splice(index, 1);
    await db.write();
  },

  async deleteAllStations() {
    db.data.stations = [];
    await db.write();
  },
};