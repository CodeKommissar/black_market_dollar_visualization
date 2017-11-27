// Dependencies
var request = require("request");
var cheerio = require("cheerio");
var moment  = require("moment");
var fs      = require("fs");

// Export statement to use our function in app.js
module.exports = function () {
  // Scraping our url
  request("http://dolartoday.com/category/cotizacion/", function(error, response, body){
    if (error) {
        console.log(error);
    } else {
        // If scrape succeeds:

        // Get the daily quotation of the dolar using cheerio
        var $ = cheerio.load(body);
        var quotationElement =  $('h2 > a').first();
        var quotationValue = parseInt(quotationElement.text().split(" ")[5]);

        // Get the current date using moment.js
        var currentDate = moment().format("D-MMM-YY");

        // Create the string that will be saved for the day
        var quotationInfo = `${currentDate}	${quotationValue}\r\n`

        // Store the daily quotation in our tsv file
        fs.appendFile('./public/data/data.tsv', quotationInfo, function (err) {
          if (err) throw err;
          console.log('Saved!');
        });
    }
  })
};
