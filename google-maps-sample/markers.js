const dummyPositions = [{
  lat: -35.397,
  lng: 150.644
}, {
  lat: -34.797,
  lng: 151.144
}, {
  lat: -34.397,
  lng: 151.644
}, {
}, {
  lat: -33.797,
  lng: 152.144
}]

function initMap() {
  const defaultPosition = new google.maps.LatLng(-34.397, 150.644)

  // Create a map object and specify the DOM element for display.
  var map = new google
    .maps
    .Map(document.getElementById('map'), {
      center: defaultPosition,
      scrollwheel: false,
      zoom: 8
    })

    // draw markers on each dummy positions
    dummyPositions.forEach(function(p, index) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(p.lat, p.lng),
        title: 'marker ' + (1 + index)
      })

      marker.setMap(map)
    })
}
