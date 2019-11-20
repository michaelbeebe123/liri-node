require("dotenv").config();
// IMPORTING DEPENDENCIES
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
moment().format();
var inquirer = require("inquirer")

var command = process.argv[2];
var value = process.argv[3];

switch (command) {
    case "concert-this":
        concertThis(value);
        break;
    case "spotify-this-song":
        spotifySong(value);
        break;
    case "movie-this":
        movieThis(value);
        break;
    case "do-what-it-says":
        doThis(value);
        break;
};

var concertThis = (value) => {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {
            // var datetime = response.data[i].datetime;
            // var dateArr = datetime.split('T');

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArr[0], "MM-DD-YYYY");
            console.log(concertResults);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

var spotifySong = (value) => {

}

var movieThis = (value) => {

}

var doThis = (value) => {
    
}