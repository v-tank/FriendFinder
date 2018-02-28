// Require necessary files
var friendsData = require("../data/friends.js");

// Exports multiple functions to be used in other files
module.exports = function(app) {
  // 'GET' route to display the plain JSON with all the friends data
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  })

  // 'POST' route to grab the sent data from the form and calculate the best match
  app.post("/api/friends", function (req, res) {
    var newUser = req.body;
    var returnedResult;
    var name;
    var photoLink;
    var menArray = [];
    var womenArray = [];

    console.log(newUser); // Logs out the sent user data

    // Checks with proper array depending on user's interests; checks from the 'womenArray' if interested in women
    if (newUser.interestedIn === "Women") {
      // Loop to go through the entire array and push objects into a new array for women only
      for (var i = 0; i < friendsData.length; i++) {
        if (friendsData[i].sex === "Female") {
          womenArray.push(friendsData[i]);
        }
      }

      // Calls function to calculate compatibility between the new user and the user's interest
      returnedResult = calculateCompatibility(newUser, womenArray);

      name = womenArray[returnedResult[0]].name; // Grab the returned name
      photoLink = womenArray[returnedResult[0]].photo; // Grab the returned photo URL
    }

    // Checks with proper array depending on user's interests; checks from the 'menArray' if interested in men
    if (newUser.interestedIn === "Men") {
      // Loop to go through the entire array and push objects into a new array for men only
      for (var i = 0; i < friendsData.length; i++) {
        if (friendsData[i].sex === "Male") {
          menArray.push(friendsData[i]);
        }
      }

      // Calls function to calculate compatibility between the new user and the user's interest
      returnedResult = calculateCompatibility(newUser, menArray);

      name = menArray[returnedResult[0]].name;  // Grab the returned name
      photoLink = menArray[returnedResult[0]].photo; // Grab the returned photo URL
    }
    
    friendsData.push(newUser); // Push the new user into the main array with all other objects
    
    // Prep object to send to the client
    returnedResult = 
    {
      name: name, 
      photo: photoLink
    };

    res.json(returnedResult);
  }); 

  // Function to calculate the compatability between a user and an array of objects
  function calculateCompatibility(newUser, arrayForComparison) {
    var calculatedScores = []; // Creates an empty array 

    // Loop to go through the entire array to compare against
    for (var i = 0; i < arrayForComparison.length; i++) {
      var difference = 0; // Initializes the difference to 0

      // Loop to go through each of the scores in the array
      for (var j = 0; j < arrayForComparison[i].scores.length; j++) {
        newUser.scores[j] = parseInt(newUser.scores[j]); // Parses each value in array as int
        var jthDifference = Math.abs(newUser.scores[j] - arrayForComparison[i].scores[j]); // Calculates the abs difference between the user's score and each individual's scores in the object
        difference += jthDifference; // Sums up the difference between each score to calculate the total difference
      }

      // Push the difference and the index to the empty array
      calculatedScores.push({
        difference: difference, 
        index: i});
    }

    return findClosestMatch(newUser, calculatedScores); // returns the response from the function that finds the minimum value
  }

  // Function to go through the calculated array to find the minimum value
  function findClosestMatch(newUser, calculatedScores) {
    var min = 0;
    var index = 0;
    for (var i = 0; i < calculatedScores.length; i++) {
      if (i === 0) {
        min = calculatedScores[i].difference; // sets the minimum value to the first value in the array
      }
      else if (calculatedScores[i].difference < min) {
        min = calculatedScores[i].difference; // if we hit another value that's lower than the current min, re-assign it.
        index = i; // capture the index at which the minimum occurs
      }
    }

    return [index, min]; //return the index and the minimum difference
  }

}