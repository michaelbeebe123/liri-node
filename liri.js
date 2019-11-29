require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
moment().format();
// var inquirer = require("inquirer")

var concertThis = (value) => {
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp")
    .then(function(response) {    
        for (var i = 0; i < response.data.length; i++) {
            var datetime = response.data[i].datetime;
            var dateArray = datetime.split('T');

            var concertResults = 
                "--------------------------------------------------------------------" +
                    "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of the Event: " + moment(dateArray[0], "MM-DD-YYYY");
            console.log(concertResults);
        }
    }).catch(function (error) {
        console.log(error);
    });
}

var spotifySong = (value) => {
    spotify.search({
        type: "track",
        query: value
    }).then(function(response){
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
            "-------------------------------------------------------------------------" +
            "\nArtist(s): " + response.tracks.items[i].artists[0].name +
            "\nSong Name: " + response.tracks.items[i].name +
            "\nAlbum Name: " + response.tracks.items[i].album.name +
            "\nPreview Link: " + response.tracks.items[i].preview_url;

            console.log(spotifyResults);
        }
    }).catch(function(err){
        console.log(err);
    });
}

var movieThis = (value) => {
    axios.get("https://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy")
    .then(function(response){
        var movieResults =
        "-------------------------------------------------------------------------------" +
        "\nMovie Title: " + response.data.Title +
        "\nYear of Release" + response.datat.Year +
        "\nIMBD Rating: " + response.data.imbdRating +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
        "\Country Produced: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot + 
        "\nActors/Actresses: " + response.data.Actors;

        console.log(movieResults);
    }).catch(function(error){
        console.log(error);
    });
}

var doThis = (value) => {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            console.log(error);
        }
        var dataArray = data.split(",");
        spotifySong(dataArray[0], dataArray[1]);
    })
}

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