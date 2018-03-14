// var mongoose = require('mongoose');
var Headline = require('../models/Headline.js');
var request = require('request');
var cheerio = require('cheerio');
var scrape = require('../scripts/scrape.js')


module.exports = function(app) {

  app.get('/scrape', function(req, res) {
    scrape()
    res.send("scrape complete")
  })

  app.get('/headlines', function(req, res) {
    Headline.find({saved: false}).then(headlines => res.json(headlines));
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

  app.put('/saved/:id', function(req, res) {
    Headline.update({_id: req.params.id}, {$set: {saved: false}})
      .then(s => res.json(s))
  })


}


