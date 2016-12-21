function initMap() {
  var activeWindow = null

  $.get('/data', function(data) {
    // Create a map object and specify the DOM element for display.
    var map = new google
      .maps
      .Map(document.getElementById('map'), {
        center: new google.maps.LatLng(data.row[0].LAT, data.row[0].LNG),
        scrollwheel: false,
        zoom: 12
      })

    // draw markers on each dummy positions
    data.row.forEach(function(p, index) {
      var infoWindow = new google.maps.InfoWindow({
        content: '<h1>' + p.FLY_NAM + ' ' + p.PANAME + '</h1><p>' + p.RMK + '</p>'
      })

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(p.LAT, p.LNG),
        title: p.FLY_NAM + ' ' + p.PANAME
      })

      marker.addListener('click', function() {
        if (activeWindow) activeWindow.close()
        activeWindow = infoWindow
        infoWindow.open(map, marker)
      })

      marker.setMap(map)
    })
  })
}
