// var mongoose = require('mongoose');
var Headline = require('../models/Headline.js');
var request = require('request');
var cheerio = require('cheerio');
// var db = require('../models')

module.exports = function(app) {

  app.get('/scrape', function(req, res) {
    request("https://news.ycombinator.com/", function (error, response, html) {
  
      var $ = cheerio.load(html);
  
      $('td.title').each(function (i, element) {
  
        console.log(element)
  
        var title = $(element).children('a').text();
        var link = $(element).children('a').attr('href')
        // var source = $(title).next().hasClass('sitebit')
  
        if (title && link) {
          Headline.create({
            title: title,
            link: link
            // source: source
          },
          (err, inserted) => err ? console.log(err) : console.log(inserted));
        };
      });

      // $('span.sitebit').each(function (i, element) {
  
      //   console.log(element)
  
      //   var source = $(element).children('a').attr('href')
        
  
      //   if (title && link) {
      //     Headline.create({
      //       title: title,
      //       link: link
      //     },
      //     (err, inserted) => err ? console.log(err) : console.log(inserted));
      //   };
      // });
      res.send("scrape complete")
    
    });
  
  });

}


