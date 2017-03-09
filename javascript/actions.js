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
                var myLatLng = {lat: -25.363, lng: 131.044};

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 4,
                    center: myLatLng
                });
    var keyword = $('#q').val();
    console.log(geocodeAddress(geocoder,map));
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
            //resultsMap.panTo(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
      var lat = results[0].geometry.location.lat;
      var latS = toString(lat);
      var lng = results[0].geometry.location.lng;
      var lngS = toString(lng);
      var latlngS = latS.concat(",",lngS);
      var latlng = new google.maps.LatLng(lat, lng);
             resultsMap.setCenter(latlng);
             console.log(latlngS);
      return latlngS;
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }