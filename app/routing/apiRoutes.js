// Require necessary packages and files

var friendsData = require("../data/friends.js");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  })

  app.post("/api/friends", function (req, res) {
    var newUser = req.body;
    var returnedResult;
    var name;
    var photoLink;
    var menArray = [];
    var womenArray = [];

    console.log(newUser);

    if (newUser.interestedIn === "Women") {
      for (var i = 0; i < friendsData.length; i++) {
        if (friendsData[i].sex === "Female") {
          womenArray.push(friendsData[i]);
        }
      }
      // console.log("Here are the women:");
      // console.log(womenArray);

      returnedResult = calculateCompatibility(newUser, womenArray);

      name = womenArray[returnedResult[0]].name;
      photoLink = womenArray[returnedResult[0]].photo;
    }

    if (newUser.interestedIn === "Men") {
      for (var i = 0; i < friendsData.length; i++) {
        if (friendsData[i].sex === "Male") {
          menArray.push(friendsData[i]);
        }
      }
      // console.log("Here are the men:");
      // console.log(menArray);

      returnedResult = calculateCompatibility(newUser, menArray);

      name = menArray[returnedResult[0]].name;
      photoLink = menArray[returnedResult[0]].photo;
    }
    
    friendsData.push(newUser);
  
    returnedResult = 
    {
      name: name, 
      photo: photoLink
    };

    res.json(returnedResult);
  }); 

  function calculateCompatibility(newUser, arrayForComparison) {
    var calculatedScores = [];
    for (var i = 0; i < arrayForComparison.length; i++) {
      var difference = 0;
      for (var j = 0; j < arrayForComparison[i].scores.length; j++) {
        newUser.scores[j] = parseInt(newUser.scores[j]);
        var jthDifference = Math.abs(newUser.scores[j] - arrayForComparison[i].scores[j]);
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