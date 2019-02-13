require("dotenv").config();
var Spotify = require("node-spotify-api");
var axios = require("axios");
var keys = require("./keys.js");
var command = process.argv[2];
var queryInput = process.argv.slice(3).join(" ");
var fs = require("fs");

var commandConcert = function(artist) {
  var url =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  var moment = require("moment");
  moment().format();

  axios.get(url).then(function(response) {
    console.log("Venue Name: " + response.data[0].venue.name);
    console.log("Country: " + response.data[0].venue.country);
    console.log("City: " + response.data[0].venue.city);
    console.log("Time: " + moment(response.data[0].datetime).format("LLLL")); // < --- NEED TO USE MOMENT!!!!!! DONE
  });
};

var spotify = new Spotify(keys.spotify);

var commandSpotify = function(song) {
  spotify.search({ type: "track", query: queryInput }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log("Artist: " + data.tracks.items[0].artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Check out the preview: " + data.tracks.items[0].preview_url);
    console.log("Album Name: " + data.tracks.items[0].album.name);
  });
};

var commandMovie = function(movie) {
  var movieName = process.argv.slice(3).join(" ");

  var url =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(url).then(function(response) {
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

  if (movieName === undefined) {  // <-- NEED TO GET Mr. Nobdy
    movieName = "Mr. Nobody";
  }
};

// Spotify======================================================================================

console.log(process.argv);

//  switch statement to handle different commands..
switch (command) {
  case "spotify-this-song":
    var song = process.argv.slice(3).join(" ");
    commandSpotify(song);
    break;

  case "concert-this":
    var artist = process.argv.slice(3).join(" ");
    commandConcert(artist);
    break;

  case "movie-this":
    var movie = process.argv.slice(3).join(" ");
    commandMovie(movie);
    break;

  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      dataArr = data.split(",");
      console.log(dataArr) //<---- this works
      for (var i = 0; i < dataArr.length; i++) {
        if (dataArr === 'spotify-this-song'){
          song=dataArr;
          commandSpotify(song);
        }else if (dataArr === 'concert-this'){
          artist=dataArr;
          commandConcert(artist);
      }else if (dataArr === 'movie-this'){
        movie=dataArr;
        commandMovie(movie);
      }else {console.log("I do not recogonize the command");
    }
    console.log(data.arr)
    }});

    break;

  default:
    console.log("I do not recogonize the command");
}
