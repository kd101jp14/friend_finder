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
      name: "",
      photo: "",
      friendDifference: 0
    };
    // Parse data from the user
    var userData = req.body;
    var userName = userData.firstName + " " + userData.lastName;
    var userScores = userData.scores;

    // Save scores by looping through and returning integers
    var b = userScores.map(function(item) {
      return parseInt(item, 10);
    });
    userData = {
      name: req.body.firstName + " " + req.body.lastName,
      photo: req.body.photo,
      scores: b
    };

    // Log results
    console.log("Name: " + userName);
    console.log("User Score: " + userScores);

    // Add up user scores
    var sum = b.reduce(function(a, b) {
      return a + b, 0;
    });
    console.log("Sum of user's score: " + sum);
    console.log("Best Match Friend Difference: " + bestMatch.friendDifference);
    console.log("******************************");

    // Loop through all possible friends
    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i].firstName + " " + friends[i].lastName);
      totalDifference = 0;
      console.log("Total Difference: " + totalDifference);
      console.log(
        "Best Match Friend Difference: " + bestMatch.friendDifference
      );

      var bFriendScore = friends[i].scores.reduce(function(a, b) {
        return a + b, 0;
      });
      console.log("Total Friend Score: " + bFriendScore);
      totalDifference += Math.abs(sum - bFriendScore);
      console.log("---------------->" + totalDifference);

      // Determine best match, using if statement
      if (totalDifference <= bestMatch.friendDifference) {
        bestMatch.firstName = friends[i].firstName;
        bestMatch.lastName = friends[i].lastName;
        bestMatch.photo = friends[i].photo;
        bestMatch.friendDifference = totalDifference;
      }
      console.log("Total Difference: " + totalDifference);
    }

    // Log results, save user data, and display JSON of best match
    console.log(bestMatch);
    friends.push(userData);
    console.log("New User Added!");
    console.log(userData);
    res.json(bestMatch);
  });
};
