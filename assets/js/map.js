var map;
var map2;
var service;
var infowindow;
var userLocation = [];

$(".card-medium").show();
$(".card").hide();

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
        // console.log(results);
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

    var userMarker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      position: breweriesNearMe,
      // icon: 'assets/images/map-icons-master/src/icons/crosshairs.svg',
      map: map2
    });

    google.maps.event.addListener(userMarker, 'click', function() {
      infowindow.setContent('<div><strong>YOU ARE HERE</strong></div>');  
      infowindow.open(map, this);
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<strong>Rating: </strong>' + place.rating + '<br><strong>Address: </strong>' + place.formatted_address + '</div>');
      infowindow.open(map, this); 
      $(".card-medium").hide();
      $(".card").show();

      $("#brewery-name").text(place.name);
      $("#brewery-address").text(place.formatted_address);
      $.ajax({
        method: 'GET',
        url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+place.place_id+"&key=AIzaSyCK8v4mS7joKuDEI03pAmCqQ2CJH77UBFM"
      }).then(function(data) {
          $("#brewery-phone").text(data.result.formatted_phone_number);
          // $("#brewery-image").text(data.result.photos[0].photo_reference);
          $("#brewery-website").html('<a href="' + data.result.website + '" target="_blank">Visit Website</a>');
          console.log(data);
        });
        $("#brewery-open").text(place.opening_hours.open_now ? "Open" : "Closed");

        // ======== Not Working - call to pull in image for card =============//

        // var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference="+place.photos[0].photo_reference+"&key=AIzaSyCK8v4mS7joKuDEI03pAmCqQ2CJH77UBFM";
        // //var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+place.place_id+"&key=AIzaSyCK8v4mS7joKuDEI03pAmCqQ2CJH77UBFM"
        
        
        // $.ajax({
        //   method: 'GET',
        //   // url: "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid="+place.place_id+"&key=AIzaSyCK8v4mS7joKuDEI03pAmCqQ2CJH77UBFM"
        //   url: queryURL          
        // }).then(function(data) {
        //     $("#brewery-image").html('<img src="' + queryURL + '">');
        //     console.log(data);
            
        //   });
        //   console.log("query url: " + queryURL);
      
    });
  }
})

      