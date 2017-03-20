var map;

function geocode() {

    var myLatLng = {lat: -25.363, lng: 131.044};

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng
    });


    var geocoder = new google.maps.Geocoder();
    geocodeAddress(geocoder, map);
}


function addVideoMarkers(title, lats, lons){
    for(var i = 0; i < lats.length; i++){
        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(lats[i],lons[i]),
        });

        var infowindow =  new google.maps.InfoWindow({
            content: title[i],
            map: map,
            position: new google.maps.LatLng(lats[i],lons[i])
        });
        marker.addListener('click', function() {
            infowindow.open(map, this);
        });

        marker.addListener('dblclick', function() {
            infowindow.close(map, this);
        });
    }

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

    var myVar;

    //Work in progress, whatever the fuck it is that you do, DO NOT CHANGE THE
    //FIRST FUCKING GET MESSAGE. OR THE SECOND ONE, YOU MAY ONLY FUCK AROUND
    //WITH .THEN() PORTION OF THE CODE!
    $.when(
        $.get("../php/geolocation.php",
            {
                q: keyword,
                location: location,
                locationRadius: r,
                maxResults: maxResult
            },
            function (data) {
                $('#geolocation-results').html(data);
            }
        ),
        $.get("../php/geolocation.php",
            {
                q: keyword,
                location: location,
                locationRadius: r,
                maxResults: maxResult,
                flag: "json"
            },

            function (data) {
                //
                //myVar = (JSON.stringify(data));
                myVar = JSON.parse(data);
            }
        ), "json")
        .then(function () {
            //literally just here to make sure we don't have sync issues. 
        });
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
                zoom: 12,
                map: resultsMap,
                position: results[0].geometry.location
            });
            var latS = results[0].geometry.location.lat().toString();
            var lngS = results[0].geometry.location.lng().toString();
            //alert((results[0].geometry.location.lat()));
            var latLang = latS.concat(',', lngS);
            $('#hidden').val(latLang);
            console.log($('#hidden').val());

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

