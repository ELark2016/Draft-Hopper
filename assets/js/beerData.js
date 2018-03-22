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

database.ref().on("child_added", function (childSnapshot, prevChildKey) {
  // console.log(childSnapshot.val());
  
  var beerStyle = childSnapshot.val().beerStyle;
  var beerABV = childSnapshot.val().beerABV;
  var beerBody = childSnapshot.val().beerBody;
  var beerColor = childSnapshot.val().beerColor;
  var glassType = childSnapshot.val().glassType;
  var servingTemp = childSnapshot.val().servingTemp;


  var newTab = ("<li class='tab'>" + "<a class='active' href='#" + beerStyle + "'>" + beerStyle + "</a></li>");

  // var testRow = [`<div id="${beerStyle}" class="col s12">${beerABV}, ${beerBody}, ${beerColor}</div>`]
  var newRow = [
    `
      <div id="${beerStyle}" class="col s12">
        <div class="row">
          <div class="col s12 m12">
            <div class="card horizontal"> <!--Center content in card-->
              <div class="card-image">
                <img src="assets/images/beers/placeholder.jpg">
              </div>
              <div class="card-stacked">
                <div class="card-content valign-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th colspan="2">${beerStyle} Facts:</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Body: </td>
                        <td>${beerBody}</td>
                      </tr>
                      <tr>
                        <td>Color: </td>
                        <td>${beerColor}</td>
                      </tr>                            
                      <tr>
                        <td>ABV: </td>
                        <td>${beerABV}</td>
                      </tr>
                      <tr>
                        <td>Glass Style: </td>
                        <td>${glassType}</td>
                      </tr>
                      <tr>
                        <td>Serving Temperature: </td>
                        <td>${servingTemp}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-action">
                  <a href="#">This is a link</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </div>
    `
  ];  

  $("#beerTabs").append(newTab);
  $("#beerInfo").append(newRow);
  // $("#beerInfo").append(testRow);

  
});

$(document).ready(function () {
    $('ul.tabs').tabs();
    $('ul.tabs').tabs('select_tab', beerStyle);
  });