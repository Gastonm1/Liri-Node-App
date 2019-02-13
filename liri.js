require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var command = process.argv[2];
var queryInput = process.argv.slice(3).join(" ");
var fs = require('fs');

// Spotify======================================================================================
var spotify = new Spotify(keys.spotify);

console.log(process.argv);

//  if statement to handle different commands..
switch (command) {
  case "spotify-this-song":
    spotify.search({ type: "track", query: queryInput }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Check out the preview: " + data.tracks.items[0].preview_url);
      console.log("Album Name: " + data.tracks.items[0].album.name);
    });
    break;

  case "concert-this":
    var artist = process.argv.slice(3).join(" ");

    var url =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=codingbootcamp";
      
      var moment = require('moment')
      moment().format();

    axios.get(url).then(function(response) {
      console.log("Venue Name: " + response.data[0].venue.name);
      console.log("Country: " + response.data[0].venue.country);
      console.log("City: " + response.data[0].venue.city);
      console.log("Time: " + (moment(response.dat/a[0].datetime).format('LLLL'))) // < --- NEED TO USE MOMENT!!!!!! DONE
    });
    break;

  case "movie-this":
    var movieName = process.argv.slice(3).join(" ");

    var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    
    axios.get(url).then(
      function(response) {
        //console.log(response)
        console.log("Title: " + response.data.Title);
        console.log("Release Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
        console.log("Country Produced: " + response.data.Country);
        console.log("Language of the Movie: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Country Produced: " + response.data.Country);
        console.log("A few of the Actors : " + response.data.Actors);
      });

        if (movieName === undefined){
          movieName = "Mr. Nobody";
        }

    break;

  case "do-what-it-says":

      fs.readFile('random.txt', 'utf8', function(err, data){
        if (err) {
          return console.log(err);
        }
        
        var output = data;
        console.log(output)
      })

    break;

  default:
    console.log("I do not recogonize the command");
}
