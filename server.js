const mongoose = require("mongoose");
const cheerio = require('cheerio');
const request = require('request');
var express = require('express');
var exphbs = require('express-handlebars');
const Article = require("./models/article");
var app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
//connects body from home page to {{{body}}} in main
app.get('/', function (req, res) {
    res.render('home');
});

app.get("/scrape", function (req, res) {
    // TODO

    // save data into DB
    Article.create({
        title: "Peter Parker",
        link: "http://www.google.com",
        saved: false
    })

    // Go to their news source
    request('https://www.nytimes.com/', function (error, response, body) {

        if(error) {
            console.log('error:', error); // Print the error if one occurred
        }
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

        // Scrape data
        const $ = cheerio.load(body); // html ready to use
        const result = $(".story-heading").text();
        console.log("Results: ", Array.isArray(result));
        
        // .story-heading
    });

 // Send a response back
    res.json({ message: "Ok" });

});

app.listen(3000, function() {
    console.log(" Server is starting at port 3000");
    
});





// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

