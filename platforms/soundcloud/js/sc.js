//var SoundCloudAudio = require('soundcloud-audio');

// create new instance of audio
var scPlayer = new SoundCloudAudio( '5882f6425263623d4e9ec15bf3de1c9a' );

// if you have an api stream url you can just play it like that
//scPlayer.play({streamUrl: 'https://api.soundcloud.com/tracks/185533328/stream'});

// OR in other cases you need to load TRACK and resolve it's data
scPlayer.resolve('https://soundcloud.com/rlgrime/sets/high-beams-ep', function ( track, err ) {
    // do smth with track object
    // e.g. display data in a view etc.
    console.log( "track...  ", track ); 
    
    console.log( "error...  ", err ); 

    // once track is loaded it can be played
    scPlayer.play();

    // stop playing track and keep silence
//    scPlayer.pause();
});