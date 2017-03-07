function sendData() {

    var keyword = $('#q').val();
    var location = $('#location').val();
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