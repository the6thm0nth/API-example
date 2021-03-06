const express = require('express')
const path = require('path')
const request = require('superagent')

const app = express()
const PORT = 3000

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


app.get('/', function(req, res) {
  res.send('API Example')
})

app.get('/data', function(req, res) {
  res.json({})
})

app.get('/map', function(req, res) {
  res.render('map')
})

app.get('/facebook', function(req, res) {
  res.render('facebook')
})

app.listen(PORT, function() {
  console.log('listening on port ' + PORT)
})
