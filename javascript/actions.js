function sendData() {


//  document.getElementById('submission').addEventListener('click', function() {
//    geocodeAddress(geocoder, map);
//  });
    var keyword = $('#q').val();
    var location = $('#location').val();//geocodeAddress(geocoder,map);//$('#location').val();
    var r = $('#locationRadius').val();
    var maxResult = $('#maxResults').val();

    console.log("keyword is: " + keyword);

    $.get(
        "../php/geolocation.php",
        {
            q: keyword,
            location: location,
            locationRadius: r,
            maxResults: maxResult
        },
        function (data) {
            $('#geolocation-results').html(data);
        }
    );
}

function buttonClick() {
    $("#submission").submit(function(e) {
        e.preventDefault();
    });
    sendData();
}

function geocodeAddress(geocoder, resultsMap) {
  var address = $('#location').val();
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      var location = results[0].geometry.location;
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  return location;
}