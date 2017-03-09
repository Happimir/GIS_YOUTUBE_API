function geocode() {

    var myLatLng = {lat: -25.363, lng: 131.044};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatLng
    });


    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map);

}

function sendData() {


//  document.getElementById('submission').addEventListener('click', function() {
//    geocodeAddress(geocoder, map);
//  });


    var keyword = $("#q").val();
    var r = $('#locationRadius').val();
    var maxResult = $('#maxResults').val();
    var location = $("#hidden").val();


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
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            var latS = results[0].geometry.location.lat().toString();
            var lngS = results[0].geometry.location.lng().toString();
            //alert((results[0].geometry.location.lat()));
            var latLang = latS.concat(',', lngS);
            $('#hidden').val(latLang);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

/*function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('location').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
              var latS = results[0].geometry.location.lat().toString();
              var lngS = results[0].geometry.location.lng().toString();
              //alert((results[0].geometry.location.lat()));
              var latLang = latS.concat(',', lngS);
              $('#location').val(latLang);

          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
*/
