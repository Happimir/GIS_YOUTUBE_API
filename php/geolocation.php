<?php
/**
 * This sample lists videos that are associated with a particular keyword and are in the radius of
 *   particular geographic coordinates by:
 *
 * 1. Searching videos with "youtube.search.list" method and setting "type", "q", "location" and
 *   "locationRadius" parameters.
 * 2. Retrieving location details for each video with "youtube.videos.list" method and setting
 *   "id" parameter to comma separated list of video IDs in search result.
 *
 * Original Author of the sample code available from Google's developer page:
 * @author Ibrahim Ulukaya
 *
 * Modified for project needs and other requirements for the successful completion of the project
 * @author Michael Kovalsky
 */

/**
 * Library Requirements
 *
 * 1. Install composer (https://getcomposer.org)
 * 2. On the command line, change to this directory (api-samples/php)
 * 3. Require the google/apiclient library
 *    $ composer require google/apiclient:~2.0
 */
if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    throw new \Exception('please run "composer require google/apiclient:~2.0" in "' . __DIR__ .'"');
}

require_once __DIR__ . '/vendor/autoload.php';

$htmlBody = null;
// This code executes if the user enters a search query in the form
// and submits the form. Otherwise, the page displays the form above.
if (isset($_GET['q'])
    && isset($_GET['maxResults'])
    && isset($_GET['locationRadius'])
    && isset($_GET['location'])) {

    /*
     * Set $DEVELOPER_KEY to the "API key" value from the "Access" tab of the
    * {{ Google Cloud Console }} <{{ https://cloud.google.com/console }}>
    * Please ensure that you have enabled the YouTube Data API for your project.
    */
    $DEVELOPER_KEY = 'AIzaSyC6q-84bJv9HWCUDT4_SQ5Bp9WFJW2Z-e4';

    $client = new Google_Client();
    $client->setDeveloperKey($DEVELOPER_KEY);

    // Define an object that will be used to make all API requests.
    $youtube = new Google_Service_YouTube($client);

    try {
        // Call the search.list method to retrieve results matching the specified
        // query term.
        $searchResponse = $youtube->search->listSearch('id,snippet', array(
            'type' => 'video',
            'q' => $_GET['q'],
            'location' =>  $_GET['location'],
            'locationRadius' =>  $_GET['locationRadius'],
            'maxResults' => $_GET['maxResults'],
        ));

        $videoResults = array();
        # Merge video ids
        foreach ($searchResponse['items'] as $searchResult) {
            array_push($videoResults, $searchResult['id']['videoId']);
        }
        $videoIds = join(',', $videoResults);

        # Call the videos.list method to retrieve location details for each video.
        $videosResponse = $youtube->videos->listVideos('snippet, recordingDetails', array(
            'id' => $videoIds,
        ));

        $videos = '';
        $ids = array();
        $locs = array();
        // Display the list of matching videos.
        foreach ($videosResponse['items'] as $videoResult) {
            $videos .= sprintf('<li>%s,%s (%s,%s)</li>',
                $videoResult['id'],
                $videoResult['snippet']['title'],
                $videoResult['recordingDetails']['location']['latitude'],
                $videoResult['recordingDetails']['location']['longitude']);

            array_push($locs, $videoResult['recordingDetails']['location']['latitude'] . "," . $videoResult['recordingDetails']['location']['longitude']);
            array_push($ids, $videoResult['id']);
        }

        unlink("data.txt");
        $dataFile = fopen("data.txt", "w") or die("Unable to open/make file");

        foreach($locs as $data) {
            fwrite($dataFile, $data . "\n");
        }

        $frames = "";
        foreach ($ids as $val) {
            $frames .= "<iframe width=\"420\" height=\"315\"
            src=\"https://www.youtube.com/embed/$val\">
            </iframe>";
        }

//        <h3>Videos</h3>
//    <ul>$videos</ul>

        if(isset($_GET['flag'])) {
            echo json_encode($videosResponse['items']);
        } else {
$htmlBody = <<<END
        $frames;
END;
            
            echo $htmlBody;
        }

    } catch (Google_Service_Exception $e) {
        $htmlBody .= sprintf('<p>A service error occurred: <code>%s</code></p>',
            htmlspecialchars($e->getMessage()));
    } catch (Google_Exception $e) {
        $htmlBody .= sprintf('<p>An client error occurred: <code>%s</code></p>',
            htmlspecialchars($e->getMessage()));
    }



} else {

    echo "<h1>" . "Something is not set" . "</h1>"
     . "<h1>" . $_GET['q'] . "</h1>"
     . "<h1>" . $_GET['location'] . "</h1>"
     . "<h1>" . $_GET['locationRadius'] . "</h1>"
     . "<h1>" . $_GET['maxResults'] . "</h1>";

}

?>




