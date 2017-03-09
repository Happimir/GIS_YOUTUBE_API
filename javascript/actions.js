function sendData() {
    function initMap() {
                var myLatLng = {lat: -25.363, lng: 131.044};

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 4,
                    center: myLatLng
                });

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    title: 'Hello World!'
                });
            }
            
  var geocoder = new google.maps.Geocoder();

//  document.getElementById('submission').addEventListener('click', function() {
//    geocodeAddress(geocoder, map);
//  });
    var keyword = $('#q').val();
    var location = geocodeAddress(geocoder,map);//$('#location').val();
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
        var address = document.getElementById('location').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
                  var lat = results[0].geometry.location.lat;
      var latS = lat.toString();
      var lng = results[0].geometry.location.lng;
      var lngS = lng.toString();
      resultsMap.setCenter({lat: lat, lng: lng});
      var latlng = latS.concat(",",lngS);
      return latlng;
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }