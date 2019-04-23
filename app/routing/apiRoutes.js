// Require friends data
var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var newUser = req.body;

    console.log(newUser);

    // We then add the json the user sent to the character array
    friends.push(newUser);

    // We then display the JSON to the users
    res.json(newUser);
  });
};
