// Require friends data
var friends = require("../data/friends");

module.exports = function(app) {
  // Display all possible friends in JSON format
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  //API POST request
  app.post("/api/friends", function(req, res) {
    var totalDifference = 0;
    var bestMatch = {
      firstName: "",
      lastName: "",
      photo: "",
      friendDifference: null
    };
    // Parse data from the user
    var userData = req.body;
    var userScores = userData.scores;

    // Save scores by looping through and returning integers
    var b = userScores.map(function(item) {
      return parseInt(item, 10);
    });

    userData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      photo: userData.photo,
      scores: b
    };

    // Log results
    console.log("Name: " + userData.firstName + " " + userData.lastName);
    console.log("User Score: " + userScores);

    // Add up user scores
    var sum = b.reduce(function(a, b) {
      return a + b;
    }, 0);
    console.log("Sum of user's score: " + sum);
    console.log("******************************");

    // Loop through all possible friends
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].firstName + " " + friends[i].lastName);
      totalDifference = 0;

      var bFriendScore = friends[i].scores.reduce(function(a, b) {
        return a + b;
      },0);
      console.log("Total Friend Score: " + bFriendScore);
      totalDifference += Math.abs(sum - bFriendScore);
      console.log("----------------> Total Difference " + totalDifference);
   
      // Determine best match, using if statement
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.firstName = friends[i].firstName;
        bestMatch.lastName = friends[i].lastName;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
    }

    // Log results, save user data, and display JSON of best match
    console.log(bestMatch);
    friends.push(userData);
    console.log("New User Added!");
    console.log(userData);
    res.json(bestMatch);
  });
};
