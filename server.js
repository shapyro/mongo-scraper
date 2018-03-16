var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var logger = require('morgan');
var mongoose = require('mongoose');
var cheerio = require('cheerio');
var db = require ('./models')
var PORT = 8080;
var app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoScraper database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScraper";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {})

require("./routes/api-routes.js")(app);
require("./routes/view-routes.js")(app);

app.listen(PORT, number => console.log(`Mongo Scraper running on ${PORT}`));