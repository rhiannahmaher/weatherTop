import express from "express";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { stationController } from "./controllers/station-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { reportController } from "./controllers/report-controller.js";
import { profileController } from "./controllers/profile-controller.js";
import { userController } from "./controllers/user-controller.js";

export const router = express.Router();

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);

router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", dashboardController.addStation);  // allows button to work for add playlist
router.get("/stations/user/:userid", dashboardController.sortStations);
router.get("/dashboard/deletestation/:id", dashboardController.deleteStation);

router.get("/station/:id", stationController.index);
router.post("/station/:id/addreport", stationController.addReport);
router.get("/station/:stationid/deletereport/:reportid", stationController.deleteReport);

router.get("/about", aboutController.index);

router.get("/station/:stationid/editreport/:reportid", reportController.index);
router.post("/station/:stationid/updatereport/:reportid", reportController.update); 
router.post("/station/:stationid/report/:reportid", reportController.delete);

router.get("/profile", profileController.index);

router.get("/user/:userid/edituser", userController.index);
router.post("/user/:userid/updateuser", userController.update);






