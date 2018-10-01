document.addEventListener("DOMContentLoaded", function (event) {

  var myLatLng = {lat: 55.733806, lng: 37.664389};
  var myCenter = {lat: 55.733806, lng: 37.664389};

  var map = new google.maps.Map(document.getElementById('contactsMap'), {
    zoom: 16,
    center: myCenter

  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'г. Москва, ул. Садовая, 12'
  });

  google.maps.event.addDomListener(window, "load", function() {
    if ($("#mobile-indicator").css("display") == "block") {
      map.setCenter(myLatLng);
    } else {
      map.setCenter(myCenter);
    }

    if ($("#mobile-indicator").css("display") == "block") {

      infowindow.setOptions({
        maxWidth: 280
      })

    }

  });


});
                      