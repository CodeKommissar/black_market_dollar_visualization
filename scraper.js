var request = require("request");
var cheerio = require("cheerio");
var moment  = require("moment");
var fs      = require("fs");

// Arguments for the request() method call
var url = "https://dolartoday.com/category/cotizacion/";
var options = {
  headers: {'user-agent': 'node.js'}
}

// Export statement to use this function in app.js
module.exports = function () {
  request(url, options, function(error, response, body){
    if (error) {
        console.log(error);
    } else { 
        // If we successfully make our http request:

        // Get the daily quotation of the dolar using cheerio
        var $ = cheerio.load(body);
        var quotationElement =  $('h2 > a').first();
        var quotationValue = parseInt(quotationElement.text().split(" ")[5]);

        // Get the current date using moment.js
        var currentDate = moment().format("D-MMM-YY");

        // Create the string that will be saved for the day
        var quotationInfo = `${currentDate}	${quotationValue}\r\n`

        // Get the last line of the tsv file
        var savedData = fs.readFileSync('./public/data/data.tsv').toString();
        var lastLine = savedData.trim().split('\n').slice(-1)[0];

        // Because of how Heroku works (the server starts to sleep after 30 min of inactivity),
        // everytime someone starts the server...
        // this code will scrape the site and if the daily quotation is a different value...
        // to the last line saved...
        // it will get saved to our data.tsv file
        if (lastLine.trim() !== quotationInfo.trim()) {
          // Store the daily quotation in our tsv file
          fs.appendFile('./public/data/data.tsv', quotationInfo, function (err) {
            if (err) throw err;
            console.log('New quotation saved!');
          }); 
        } else {
          console.log("They have the same value")
        }
    }
  })
};
