// Dependencies
var express          = require("express");
var scrapeDolarToday = require('./scraper.js');

// Setting our server
var app = express();
var port = process.env.PORT || 8000;
app.use(express.static("public"));
app.set("view engine", "ejs");

// Every day scrape http://dolartoday.com
setInterval(scrapeDolarToday, 1000*60*60*24)

// Render our index.html page in the "/" route
app.get("/", function(req, res){
  res.render("index");
});

// Express starting to work
app.listen(port, function(){
  console.log("Server is listening on: " + port);
});

// TODO:
// 1. Separate visualization script to index.ejs to it's own file

// Due to how Heroku works:
// 2. Add a line to call scrapeDolarToday() every time the server starts again
// 3. In the visualization script get the last line of .tsv file and... 
// check if we're adding a new piece of data