var path = require('path')

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('../views/home.handlebars')
    // res.sendFile(path.join(__dirname, '../views/layouts/main.handlebars'))
  })

  app.get('/headlines', function(req, res) {
    res.render('../views/home.handlebars')
    // res.sendFile(path.join(__dirname, '../views/layouts/main.handlebars'))
  })

  app.get('/saved', function(req, res) {
    res.render('../views/saved.handlebars')
  })

}