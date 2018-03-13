// var mongoose = require('mongoose');
var Headline = require('../models/Headline.js');
var request = require('request');
var cheerio = require('cheerio');
// var db = require('../models')

module.exports = function(app) {

  // scrape data from ycombinator
  app.get('/scrape', function(req, res) {
    request("https://news.ycombinator.com/", function (error, response, html) {
  
      var $ = cheerio.load(html);

      // $('tr.athing').each(function (i, element) {
  
      //   console.log(element)
  
      //   var title = $(element).next('td.title').children('a').text()
      //   var link = $(element).next('span.sitebit').children('a').attr('href')
      //   // var source = $(title).next().hasClass('sitebit')
      //   console.log(title)
      //   console.log(link)

  
      //   if (title && link) {
      //     Headline.create({
      //       title: title,
      //       link: link
      //       // source: source
      //     },
      //     (err, inserted) => err ? console.log(err) : console.log(inserted));
      //   };
      // });
  
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

  app.get('/headlines', function(req, res) {
    Headline.find().then(headlines => res.json(headlines));
  })

  app.put('/headlines/:id', function(req, res) {
    Headline.update({_id: req.params.id}, {$set: {saved: true}})
      .then(s => res.json(s))
  })

  app.get('/saved', function(req, res) {
    Headline.find({
      saved: true
    }).then(headlines => res.json(headlines));
  })

}


