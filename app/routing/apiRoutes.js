// Your `apiRoutes.js` file should contain two routes:

// * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
// * A POST routes `/api/friends`. This will be used to handle incoming survey results.
//   This route will also be used to handle the compatibility logic.

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
