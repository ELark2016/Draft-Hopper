// Initialize Firebase
var config = {
  apiKey: "AIzaSyCK8v4mS7joKuDEI03pAmCqQ2CJH77UBFM",
  authDomain: "project1-drafthopper.firebaseapp.com",
  databaseURL: "https://project1-drafthopper.firebaseio.com",
  projectId: "project1-drafthopper",
  storageBucket: "project1-drafthopper.appspot.com",
  messagingSenderId: "1018212755473"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#addBeer").on("click", function(event) {
  event.preventDefault();

  var beerStyle = $("#beerStyle").val().trim();
  var beerABV = $("#beerABV").val().trim();
  var beerBody = $("#beerBody").val().trim();
  var beerColor = $("#beerColor").val().trim();
  var glassType = $("#glassType").val().trim();
  var servingTemp = $("#servingTemp").val().trim();
  var beerImg = $("#beerImg").val().trim();

  //Temp obj for database upload
  var newStyle = {
    beerStyle: beerStyle,
    beerABV: beerABV,
    beerBody: beerBody,
    beerColor: beerColor,
    glassType: glassType,
    servingTemp: servingTemp,
    beerImg: beerImg
  };

  //Add new style to database
  database.ref().push(newStyle);

  //Clear form fields
  $("#beerStyle").val("");
  $("#beerABV").val("");
  $("#beerBody").val("");
  $("#beerColor").val("");
  $("#glassType").val("");
  $("#servingTemp").val("");
  $("#beerImg").val("");

  console.log("Style added!");

});