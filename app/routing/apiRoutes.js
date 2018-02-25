module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.send("Hello! Friends JSON data will go here. Will need to change method to JSON instead of SEND.");
  })

  app.post("/api/friends", function(req, res) {
    res.send("Hello! This will handle the incoming survey results and handle the compatibility logic.");
  });
}