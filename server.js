// Dependencies
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

// Variables for Express app configuration
var app = express();
var PORT = process.env.PORT || 3000;

// Middlewear to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));

app.use(express.static("app/public"));

// Router
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Listener on port 3000
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });