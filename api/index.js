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
  var start = req.query.start || 1
  var end = req.query.end || 5

  getDataFromSeoul(start, end)
    .then(function(result) {
      res.json(result.body.GeoInfoParkParkingWGS)
    }, handleError)
})

app.get('/simple', function(req, res) {
  var start = req.query.start || 1
  var end = req.query.end || 5

  getDataFromSeoul(start, end)
    .then(function(result) {
      res.render('index', {
        parks: result.body.GeoInfoParkParkingWGS.row,
        totalCOunt: result.body.GeoInfoParkParkingWGS.list_total_count
      })
    }, handleError)
})

app.get('/map', function(req, res) {
  res.render('map')
})

app.get('/facebook', function(req, res) {
  res.render('facebook')
})


function getDataFromSeoul(start, end) {
  const apikey = '506c4e505a7468653131374a51764867'
  const url = 'http://openapi.seoul.go.kr:8088/' + apikey + '/json/GeoInfoParkParkingWGS/' + start + '/' + end

  return request(url)
}

function handleError(err) {
  console.error(err)
  throw new Error('Error!')
}

app.listen(PORT, function() {
  console.log('listening on port ' + PORT)
})
