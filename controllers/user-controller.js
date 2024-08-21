import { userStore } from "../models/user-store.js";

export const userController = {
    async index(request, response) {
      const userId = request.params.userid;
      console.log(`Editing User Details ${userId}`); // userId printing to console as undefined 
      const viewData = {
        title: "Edit User Details",
        user: await userStore.getUserById(userId)
      };
      response.render("user-view", viewData);
    },

    async update(request, response) {
        const userId = request.params.userid;
        const updatedUser = {
          firstName: request.body.firstName,
          lastName: request.body.lastName,
          email: request.body.email,
          password: request.body.password,
        };
      
          console.log(`Updating User ${userId}`);
          await userStore.updateUser(userId, updatedUser); // removed const report = await reportStore.getReportById(reportId); | await reportStore.updateReport(report, updatedReport); as would not update
          response.redirect("/profile"); 
          console.log(updatedUser); // this is printing to console correctly
      }
}