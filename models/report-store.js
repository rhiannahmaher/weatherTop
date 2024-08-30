import { v4 } from "uuid";
import { initStore } from "../utils/store-utils.js";
import dayjs from 'dayjs'; // ref

const db = initStore("reports");

export const reportStore = {
  async getAllReports() {
    await db.read();
    return db.data.reports;
  },

  async addReport(stationId, report) {
    await db.read();
    report._id = v4();
    report.stationid = stationId;
    db.data.reports.push(report);
    await db.write();
    return report; 
  },

  async addForecastToDB(stationId, report) {
    try {
        await db.read();
        
        // Generate a new ID for the report
        report._id = v4();
        report.stationid = stationId;
        
        // Add the new report to the database
        db.data.reports.push(report);
        
        // Save the updated database
        await db.write();
        
        return report;
    } catch (error) {
        console.error("Failed to add forecast to database:", error.message);
        throw error; // Propagate the error
    }
},

  async getReportsByStationId(id) {
    await db.read();
    return db.data.reports.filter((report) => report.stationid === id);
  },

  async getReportById(id) {
    await db.read();
    return db.data.reports.find((report) => report._id === id);
  },

  async updateReport(reportId, updatedReport) {
    const report = await this.getReportById(reportId);
    report.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
    report.code = updatedReport.code;
    report.temperature = updatedReport.temperature;
    report.windSpeed = updatedReport.windSpeed;
    report.windDirection = updatedReport.windDirection;
    report.pressure = updatedReport.pressure;
    await db.write();
  },

  async deleteReport(id) {
    await db.read();
    const index = db.data.reports.findIndex((report) => report._id === id);
    db.data.reports.splice(index, 1);
    await db.write();
  },

  async deleteAllReports(stationId) {
    await db.read(); 
    db.data.reports = db.data.reports.filter(report => report.stationid !== stationId); // ref filter function
    await db.write(); 
  },
}