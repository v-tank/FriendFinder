// Require necessary packages and files

var friendsData = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  })

  app.post("/api/friends", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newUser = req.body;
    // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    // console.log(newUser);

    friendsData.push(newUser);

    console.log(friendsData);

    res.json(newUser);
  });
}