function initMap() {
  /**
   * Types of Google Maps
   */
  const mapTypeIds = {
    ROADMAP: google.maps.MapTypeId.ROADMAP,
    SATELLITE: google.maps.MapTypeId.SATELLITE,
    HYBRID: google.maps.MapTypeId.HYBRID,
    TERRAIN: google.maps.MapTypeId.TERRAIN
  }

  // Create a map object and specify the DOM element for display.
  var map = new google
    .maps
    .Map(document.getElementById('map'), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      scrollwheel: false,
      zoom: 8,
      mapTypeId: mapTypeIds.ROADMAP // default
    });
}
