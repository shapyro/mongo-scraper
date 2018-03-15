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

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mongoScraper', {})

require("./routes/api-routes.js")(app);
require("./routes/view-routes.js")(app);

app.listen(PORT, number => console.log(`Mongo Scraper running on ${PORT}`));