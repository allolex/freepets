var token = "AIzaSyAm7jyIIqtaJRJoEOBPLjKF_Bq8iV2KCpM"

$(function(){
  var latitude = $("#location").data("latitude");
  var longitude = $("#location").data("longitude");

  var location = latitude + ',' + longitude;

  var mapUrl = "http://maps.google.com/maps/api/staticmap?";
  mapUrl = mapUrl + 'center=' + location;
  mapUrl = mapUrl + '&zoom=15&size=512x512';
  mapUrl = mapUrl + '&maptype=roadmap&sensor=false';
  mapUrl = mapUrl + '&markers=color:red|label:Y|' + location;
  mapUrl = mapUrl + "&key=" + token;

  var imgElement = document.getElementById("map-image");

  imgElement.src = mapUrl;
});
