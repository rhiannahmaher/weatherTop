export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: 'Playlist 1 Dashboard'
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
};