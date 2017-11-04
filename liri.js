var TwitterKeys = require("./keys.js")
var request = require("request");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var Twitter = require('twitter');

//argument handling
var appName = process.argv[2];
var args = process.argv.slice(3);
var argString = "";
//argument string creation loop
for (i = 0; i < args.length; i++){
    argString = argString + " " + args[i];
};

function movieRequest(queryString){
    var requestUrl = "https://www.omdbapi.com/?t=" + queryString + "&y=&plot=short&apikey=40e9cece";
    request(requestUrl, function(error, response, body){
        
        //Parse the returned object
        var data = JSON.parse(response.body);

        if (!error && response.statusCode === 200) {
            console.log(data.Title);
            console.log(data.Year);

            //Should check to see if these are empty as it breaks the code when they are
            console.log(data.Ratings[0].Source + ": " + data.Ratings[0].Value);
            console.log(data.Ratings[1].Source + ": " + data.Ratings[1].Value);
            ////////////

            console.log(data.Country);
            console.log(data.Language);
            console.log(data.Plot);
            console.log(data.Actors);
        }
    });

};

function spotifyRequest(spotifyQuery, x) {
    var spotify = new Spotify({
        id: '6c78e264059b4b01ba12955159873e22',
        secret: '8d4ddfd171c54a509bce295f991d27d9'
    });
    spotify.search({ type: 'track', query: spotifyQuery }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items[x].album.artists[0].name);
        console.log(data.tracks.items[x].album.artists[0].external_urls.spotify);
        console.log(data.tracks.items[x].album.name);
        console.log(data.tracks.items[x].name);
    });
};

//logic to decide which program to run
if (appName === "movie-this") {
    if (argString !== ""){
        movieRequest(argString);
    }
    else {
        movieRequest("Mr+Nobody");
    }
}
else if (appName === "spotify-this-song") {

    if ( argString !== ""){
        spotifyRequest(argString, 0);
    }
    else {
        spotifyRequest("The Sign", 8);
    }
}
else if (appName === "my-tweets" && argString === "") {
    var client = new Twitter({
        consumer_key: 'WqJeMIBMx5EMydk3Rpt1DKMYK',
        consumer_secret: 'MWizGEX9KIAgNjZamLFyY3YJFjcNqw0cMamUQE4EuGOgaVN55T',
        access_token_key: '63777579-waazCN5FA1mg9urfGN0pAmN9AbReIWxxXND2rbPPC',
        access_token_secret: 'GfnLprUoERYwcoH0G0Kx2NoyYqV1tVHmbfM74YDJBsouq',
      });
    var params = {screen_name: 'seorchestra'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          
            //Loop to display tweets
            for(j = 0; j < 10; j++){
                console.log("Tweet " + ( j + 1 ) + ": " + tweets[j].text);
            }
        };
    });
}
else if (appName === "do-what-i-say" && argString === "") {

    fs.readFile("random.txt", "utf8", function(error, data){
        
        if (error){
            return console.log(error);
        }
           
        var output = data.split(",");

        if (output[0] === "spotify-this-song"){
            spotifyRequest(output[1], 0);
        }
        if (output[0] === "movie-this"){
            movieRequest(output[1]);
        }
        if (output[0] === "my-tweets"){

        }
        

        for(i = 0; i < output.length; i++){
            console.log(output[i]);
        }
    });
}
else {
    console.log("Please enter 'movie-this', 'spotify-this-song', or 'my-tweets' as your first argument!");
};

