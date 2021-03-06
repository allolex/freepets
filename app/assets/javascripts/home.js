var token = "AIzaSyAm7jyIIqtaJRJoEOBPLjKF_Bq8iV2KCpM"

function initGeolocation() {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log('Geolocation is not supported');
  }
}

function errorCallback() {
  console.log("Browser geolocation API failure");
  console.dir(arguments);
}

function successCallback(position) {
  var location = position.coords.latitude + ',' + position.coords.longitude;

  var geoUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location + "&key=" + token;

  $.get(geoUrl, function(response) {
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

    $('#call-button').click(function(event) {
      event.preventDefault();

      $.post("/locations", payload, function(){
        console.log("post response");
        console.dir(arguments);
      });
    });

    // console.log(mapUrl);
  }).fail(function(){
    console.log("Failure");
    console.dir(arguments);
  });
}

var accordionTabs = function () {
  $('.accordion-tabs').each(function(index) {
    $(this).children('li').first().children('a').addClass('is-active').next().addClass('is-open').show();

  });
  $('.accordion-tabs').on('click', 'li > a.tab-link', function(event) {
    if (!$(this).hasClass('is-active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.accordion-tabs');
      accordionTabs.find('.is-open').removeClass('is-open').hide();

      $(this).next().toggleClass('is-open').toggle();
      accordionTabs.find('.is-active').removeClass('is-active');
      $(this).addClass('is-active');
    } else {
      event.preventDefault();
    }
  });
};

$(document).on('turbolinks:load', function() {
  accordionTabs();
  initGeolocation();
});

