#Youtube API Project

##Purpose
    The Purpose of this project was to familiarize ourselves with Youtube's API, along with Google Maps.
    Furthermore, it was a great way to learn how to use an external API in our web project. 
    Was produced for Global Information Systems at the University of Georgia. Instructor: Budak I. Arpinar
##Team Members:
    Michael Kovalsky
    Michael Smith
    Veronica McManus
    Matt Butcher

##Roles
    Michael Kovalsky: Setup Github, Php, initital web design, 
    JavaScript for video uploading, and map locations, markers
    Michael Smith: JavaScript for map locations
    Veronica McManus: JavaScript for map marking, CSS
    Matt Butcher: Verification of correct behavior
    
##How to Run/Our Testing Environment
    In order to run this code you must have a server running, be it either MAMP, XAMPP (what we used),
    or via an IDE that provides a build-in server like PHPStorm. Note that PHPStorm's server  cannot process POST
    requests, however, our project relies on GET, so if you do use it, then it is not an issue. 
    
    Another important issue is your php.ini file, you must include the following lines in your php.ini
    file: 
    

   `engine=On
     curl.cainfo = "C:\xampp\php\extras\ssl\cacert.pem"`
     
     This is to ensure that we do not have any errors while running, you will have to download a cacert.pem file,
     and then transfer it to your ssl. Of course in this example we used XAMPP, MAMP instructions are different, and 
     I am certain some Google Searching is in order. 
     
##Cloning
    No special clone requirements, just clone the repo, run it, and enjoy. 
