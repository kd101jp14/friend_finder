// Dependencies
var express = require("express");
var path = require("path");

// Variables for Express app configuration
var app = express();
var PORT = process.env.PORT || 3000;

// Middlewear to set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Listener on port 3000
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });