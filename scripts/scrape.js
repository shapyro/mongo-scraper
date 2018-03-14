const cheerio = require('cheerio');
const request = require('request'); 
var Headline = require('../models/Headline.js');

const scrape = function() {
  // scrape data from news.ycombinator
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
        {
          upsert: true
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
  
  });
}

module.exports = scrape;