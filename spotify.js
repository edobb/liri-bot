var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
    id: 6c78e264059b4b01ba12955159873e22,
     secret: 8d4ddfd171c54a509bce295f991d27d9
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});