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
