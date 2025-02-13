import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("station", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/login");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) { 
      if (user.password === request.body.password) { 
        response.cookie("station", user.email);
        console.log(`logging in ${user.email}`);
        response.redirect("/dashboard");
      } 
      else {
        response.redirect("/login"); // Redirects if typed password does not match stored password
      }
    } 
    else {
      response.redirect("/login"); // Redirects if the user's email does not exist
    }
  },

  async getLoggedInUser(request) {
    const userEmail = request.cookies.station;
    return await userStore.getUserByEmail(userEmail);
  }
}