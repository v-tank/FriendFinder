// Require necessary packages
var path = require("path");

module.exports = function(app) {
  app.get("/survey", function(req, res) {
    // serves the survey file
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  app.get("*", function(req, res) {
    // catch-all to re-direct any other url to the homepage
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });
}