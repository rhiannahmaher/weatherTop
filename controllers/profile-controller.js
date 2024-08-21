
import { accountsController } from "./accounts-controller.js";
import { userStore } from "../models/user-store.js";

export const profileController = {
    async index(request, response) {
      const user = await accountsController.getLoggedInUser(request); // changed fro loggedInUser to user
      const viewData = {
        title: "User Profile",
        user: await userStore.getUserById(user._id), // changed from loggedInUser to user
      };
      console.log("user profile rendering");
      response.render("profile-view", viewData);
    },
}