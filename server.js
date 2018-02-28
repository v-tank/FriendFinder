var express = require("express");
// Require the necessary packages
var bodyParser = require("body-parser");

// Tells node that we are creating an "express" server
var app = express();

app.use(express.static('./app/public'))

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// requires the routes files and initialize as functions
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});