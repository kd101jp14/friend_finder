// Your `apiRoutes.js` file should contain two routes:

// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results.
//   This route will also be used to handle the compatibility logic.
module.exports = function(app) {
// Display all possible friends
app.get("/api/friends", function(req, res) {
  return res.json(friends);
});

// Displays a single friend, or returns false
app.get("/api/friends/:friend", function(req, res) {
  var chosen = req.params.friend;

  console.log(chosen);

  for (var i = 0; i < friends.length; i++) {
    if (chosen === friends[i].routeName) {
      return res.json(friends[i]);
    }
  }

  return res.json(false);
});

// * Convert each user's results into a simple array of numbers 
// (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
// * With that done, compare the difference between current user's scores 
// against those from other users, question by question. 
// Add up the differences to calculate the `totalDifference`.
//   * Example:
//     * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
//     * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
//     * Total Difference: **2 + 1 + 2 =** **_5_**
// * Remember to use the absolute value of the differences. 
// Put another way: no negative solutions!
//  Your app should calculate both `5-3` and `3-5` as `2`, and so on.
// * The closest match will be the user with the least amount of difference.

// Create New friends - takes in JSON input
app.post("/api/friends", function(req, res) {
  // Assign the JSON post sent from the user to a variable

  var incomingResults = req.body;

  // Use a RegEx Pattern to remove spaces from incomingResults
  incomingResults.routeName = incomingResults.name
    .replace(/\s+/g, "")
    .toLowerCase();

  console.log(incomingResults);

  friends.push(incomingResults);

});
};
