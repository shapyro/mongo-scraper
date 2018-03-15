const cheerio = require('cheerio');
const request = require('request'); 
var Headline = require('../models/Headline.js');

const scrape = function() {
  // scrape data from news.ycombinator
  request("https://news.ycombinator.com/", function (error, response, html) {
  
    var $ = cheerio.load(html);

    $("tr.athing").each(function (i, element) {

      var td = $(element).children('td').last()

      var title = $(td).children('a').text();
      var link = $(td).children('a').attr('href')

      var span = $(td).children('span')
      var a = $(span).children('a')
      var source = $(a).children('span').text()

      if (title && link) {
        Headline.create({
          title: title,
          link: link,
          source: source
        },
        {
          upsert: true
        },

        (err, inserted) => { /* err ? console.log(err) : console.log(inserted) */ });
      };
    });
  
  });

}

module.exports = scrape;