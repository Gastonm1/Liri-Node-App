require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");

// Spotify======================================================================================
var spotify = new Spotify(keys.spotify);

console.log(process.argv);

var command = process.argv[2];
var queryInput = process.argv.slice(3).join(" ");

//  if statement to handle different commands..
switch (command) {
  case "spotify-this-song":
    spotify.search({ type: "track", query: queryInput }, function(err, data) {
      if (err) {
        return console.log("Error occurred: " + err);
      }

      console.log(data.tracks);
    });
    break;

  case "concert-this":
    var artist = process.argv.slice(3).join(" ");

    var url =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=codingbootcamp";

    axios.get(url).then(function(response) {
      console.log(response.data);
    });
    break;

  case "movie-this":
    break;

  case "do-what-it-says":
    break;

  default:
    console.log("I do not recogonize the command");
}
