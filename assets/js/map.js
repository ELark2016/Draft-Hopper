// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var map;
      var infowindow;
      var userLocation = [];
      var richmond = {lat: 37.540725, lng: -77.436048};
      var userCoordinates;


      function initMap() {
        
        

        map = new google.maps.Map(document.getElementById('map'), {
          center: richmond,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: userCoordinates,
          radius: 500,
          type: ['bar']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });


        // Geolocation Button 
      $("#location-finder").on("click", function() {
        
        
        // var output = document.getElementById("out");
      
        if (!navigator.geolocation){
          output.innerHTML = "Geolocation is not supported by your browser";
          return;
        }
      
        function success(position) {
          var latitude  = position.coords.latitude;
          var longitude = position.coords.longitude;
      
          userLocation.push(latitude, longitude)
          userCoordinates = {lat: userLocation[0], lng: userLocation[1]};
          console.log(userCoordinates);
        }
      
        function error() {
          output.innerHTML = "Unable to retrieve your location";
        }
      
        navigator.geolocation.getCurrentPosition(success, error);
      })


      }

      