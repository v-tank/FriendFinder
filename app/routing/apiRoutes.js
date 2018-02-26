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

    console.log(newUser);

    // Call function here!!!!!!!!!
    var returnedResult = calculateCompatibility(newUser, friendsData);
    var name = friendsData[returnedResult[0]].name;
    var photoLink = friendsData[returnedResult[0]].photo;
    // console.log("The closest match is " + name + "; he looks pretty handsome! " + photoLink);
    
    friendsData.push(newUser);

    returnedResult = {name: name, 
      photo: photoLink};
    // console.log(friendsData);

    res.json(returnedResult);
  });

  function calculateCompatibility(newUser, friendsData) {
    var calculatedScores = [];
    for (var i = 0; i < friendsData.length; i++) {
      var difference = 0;
      for (var j = 0; j < friendsData[i].scores.length; j++) {
        newUser.scores[j] = parseInt(newUser.scores[j]);
        var jthDifference = Math.abs(newUser.scores[j] - friendsData[i].scores[j]);
        difference += jthDifference;
        // console.log(friendsData[i].scores[j] + "; " + jthDifference);
      }
      // console.log("The difference was: " + difference + " for element " + i);
      calculatedScores.push({
        difference: difference, 
        index: i});
    }
    // console.log("\nHere are the scores and the indices:");
    // console.log(calculatedScores);
    // console.log("\n");
    return findClosestMatch(newUser, calculatedScores);
  }

  function findClosestMatch(newUser, calculatedScores) {
    var min = 0;
    var index = 0;
    for (var i = 0; i < calculatedScores.length; i++) {
      if (i === 0) {
        min = calculatedScores[i].difference;
      }
      else if (calculatedScores[i].difference < min) {
        min = calculatedScores[i].difference;
        index = i;
      }
    }
    return [index, min];
  }

}