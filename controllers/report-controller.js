import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";
import dayjs from 'dayjs'; // ref

export const reportController = {
  async index(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Editing Report ${reportId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Report",
      station: await stationStore.getStationById(stationId),
      report: await reportStore.getReportById(reportId),
    };
    response.render("report-view", viewData);
  },

  async update(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    const updatedReport = {
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    console.log(`Updating Report ${reportId} from Station ${stationId}`);
    await reportStore.updateReport(reportId, updatedReport); // removed const report = await reportStore.getReportById(reportId); | await reportStore.updateReport(report, updatedReport); as would not update
    response.redirect("/station/" + stationId);
  },

  async deletedReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    const deletedReport = await reportStore.deleteReport(reportId);
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(reportId, deletedReport);
    response.redirect("/station/" + stationId);
  }
};