
import { accountsController } from "./accounts-controller.js";
import { userStore } from "../models/user-store.js";

export const profileController = {
    async index(request, response) {
      const loggedInUser = await accountsController.getLoggedInUser(request);
      const viewData = {
        title: "User Profile",
        users: await userStore.getUserById(loggedInUser._id),
      };
      console.log("user profile rendering");
      response.render("profile-view", viewData);
      console.log(viewData);
    },
}