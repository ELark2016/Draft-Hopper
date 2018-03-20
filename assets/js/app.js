var userLocation

$("#location-finder").on("click", function() {

    userLocation = [];
  
    // var output = document.getElementById("out");
  
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
  })