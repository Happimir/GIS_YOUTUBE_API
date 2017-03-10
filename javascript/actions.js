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
                alert("data 1: " + data);
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
                alert("Data 2: " + data);
                //
                //myVar = (JSON.stringify(data));
                myVar = JSON.parse(data);
                alert("inner var: " + JSON.stringify(myVar[1].id));
            }
        ), "json")
    .then(function () {
        //Probably useless, but i think we can do our map markers with images
        //and stuff here. We know the id, and that way we can pass it into a
        //youtube url to get the thumbstick of the video.
        //myVar = JSON.parse(myVar);
        alert("myVar: " + myVar[1]);
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

