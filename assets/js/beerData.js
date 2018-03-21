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

$("document").on("load", function() {
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    var beerStyle = childSnapshot.val().beerStyle;
    var beerABV = childSnapshot.val().beerABV;
    var beerBody = childSnapshot.val().beerBody;
    var beerColor = childSnapshot.val().beerColor;
    var glassType = childSnapshot.val().glassType;
    var servingTemp = childSnapshot.val().servingTemp;
    
    var newTab = $("<li>" + "<a class='active' href='#test1'>" + beerStyle + "</a></li>");

    $("#beerTabs").append(newTab);

      
    // $("#beerTabs").append

    // $("#trainSchedule").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + moment().minute(timeTillNext).format("mm") + "</td>");
  });

});

// var tbody = $("tbody");
      
//       // Create and save a reference to new empty table row
//       var trow = $("<tr>");

//       // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
//       var tdTitle = $("<td>").text(response.Title);
//       var tdYear = $("<td>").text(response.Year);
//       var tdActors = $("<td>").text(response.Actors);

//       // Append the td elements to the new table row
//       trow.append(tdTitle, tdYear, tdActors);
//       // Append the table row to the tbody element
//       tbody.append(trow);