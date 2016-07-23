var token = "AIzaSyAm7jyIIqtaJRJoEOBPLjKF_Bq8iV2KCpM"

$(function(){
  function initGeolocation() {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      console.log('Geolocation is not supported');
    }
  }

  function errorCallback() { console.log("geo failure"); console.dir(arguments); }

  function successCallback(position) {
    console.log("success!");

    var location = position.coords.latitude + ',' + position.coords.longitude;

    var geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location + "&key=" + token;

    $.get(geoUrl, function(response){
      console.log("Success");
      console.dir(arguments);

      var address = response["results"][0]["formatted_address"];
      var place_id = response["results"][0]["place_id"];

      var payload = {
        "location" : {
          "latitude": position.coords.latitude,
          "longitude": position.coords.longitude,
          "address": address,
          "google_place_id": place_id
        }
      };

      $('#report').click(function(){
        $.post("/locations", payload, function(){
          console.dir(arguments);
        });
      });

      var mapUrl = "http://maps.google.com/maps/api/staticmap?";
      mapUrl = mapUrl + 'center=' + location;
      mapUrl = mapUrl + '&zoom=15&size=512x512';
      mapUrl = mapUrl + '&maptype=roadmap&sensor=false';
      mapUrl = mapUrl + '&markers=color:red|label:Y|' + location;
      mapUrl = mapUrl + "&key=" + token;

      // console.log(mapUrl);

      var addressElement = document.getElementById("address");
      var imgElement = document.getElementById("static-map");

      addressElement.innerHTML = address;
      imgElement.src = mapUrl;
    }).fail(function(){
      console.log("Failure");
      console.dir(arguments);
    });
  }

  initGeolocation();
});

