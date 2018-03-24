var map;
var map2;
var service;
var infowindow;
var userLocation = [];

function initMap() {

  if (!navigator.geolocation){
    output.innerHTML = "Geolocation is not supported by your browser";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    userLocation.push(latitude, longitude)
  }

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  }

  navigator.geolocation.getCurrentPosition(success, error);

  var richmond = new google.maps.LatLng(37.540725, -77.436048);

  map = new google.maps.Map(document.getElementById('map'), {
      center: richmond,
      zoom: 11
    });

  var request = {
    location: richmond,
    radius: '500',
    query: 'brewery'
  };
  
}

  $("#location-finder").on("click", function initMap() {
      
    var breweriesNearMe = new google.maps.LatLng(userLocation[0], userLocation[1]);
      
    map2 = new google.maps.Map(document.getElementById('map'), {
      center: breweriesNearMe,
      zoom: 13
    });
      
    var request = {
      location: breweriesNearMe,
      radius: '500',
      query: 'brewery'

    };

    infowindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          createMarker(results[i]);
          
        }
      }
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        map: map2,
        position: place.geometry.location
      });
  
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name + "<br>" + place.formatted_address);
        infowindow.open(map, this); 
        $("#brewery-name").text(place.name);
        $("#brewery-location").text(place.formatted_address);
        $.ajax({
          method: 'GET',
          url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+place.place_id+"&key=AIzaSyCK8v4mS7joKuDEI03pAmCqQ2CJH77UBFM"
        }).then(function(data) {
            $("#phone-number").text(data.result.formatted_phone_number)
        });
        $("#open-now").text(place.opening_hours.open_now ? "Open" : "Closed");
      });
    }
})

      