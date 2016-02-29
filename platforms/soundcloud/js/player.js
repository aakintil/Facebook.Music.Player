/////////////////////
// PLAYER CLASS
/////////////////////
trackURI = ""; 
function SCPlayer( tracks ) {

    this.self = new SoundCloudAudio( '5882f6425263623d4e9ec15bf3de1c9a' );
    this.currentTrack = {
        obj : "", 
        index: ""
    }; 

    this.nextTrack = {
        obj : "", 
        index: ""
    }; 

    this.isPlaying = false; 
    this.isPaused = true; 

    this.tracks = tracks || []; 
}

SCPlayer.prototype.init = function() {
    // putting the current track @ 0 index fucks up the play pause cuz of "bad" urls
    this.currentTrack.obj = this.tracks[ 0 ]; 
    this.currentTrack.index = 10; 
    this.nextTrack.obj = this.tracks[ 1 ]; 
    this.nextTrack.index = 11; 


    var self = this; 
    // OR in other cases you need to load TRACK and resolve it's data
    console.log( this.currentTrack.obj.url)
    this.self.resolve( this.currentTrack.obj.url, function ( track, err ) {
        // do smth with track object
        // e.g. display data in a view etc.
        console.log( "initializing the app " ); 
        console.log( "track tag...  ", track.tag_list ); 
        console.log( "track title...  ", track.title ); 
        showOnDOM( track.tag_list );

        // testing to see if this will affect the general pause / play of the song
        self._play( track.stream_url ); 
    });
}

SCPlayer.prototype._play = function( url ) {


    //    if ( this.isPaused ) {
    //    console.log( "==== DOES IT HAVE ITS OWN LOCAL LIST>? ====" ); 
    //    console.log( this.self ); 
    //    console.log( "===================================" );

    if ( url !== undefined ) {
        console.log( "we are moving to new stream")
        this.self.play({ streamUrl: url });
        this.self.on( 'play', function( audio ) {
            //            console.log( audio.path[0].attributes[0].nodeValue )
        })
    } else {
        this.self.play()
    }

    //    this.isPaused = false; 
    //    this.isPlaying = true; 
    console.log( "playing...")
    //    }
}

SCPlayer.prototype._pause = function() {

    //    if ( this.isPlaying ) {
    this.self.pause();

    this.isPaused = true; 
    this.isPlaying = false; 
    console.log( "...paused...")
    //    }
}

SCPlayer.prototype._next = function() {

    this.self.stop(); 
    var self = this; 
    this.self.resolve( this.nextTrack.obj.url , function ( track, err ) {
        // do smth with track object
        // e.g. display data in a view etc.
        if ( err ) console.log( "something happened, ", err )
        console.log( "==== MOVING ONTO THE NEXT SONG ====" ); 
        console.log( "track tag...  ", track.tag_list ); 
        console.log( "track title...  ", track.title ); 
        console.log( "===================================" ); 
        showOnDOM( track.tag_list ); 
        //        console.log( self )
        // once track is loaded it can be played
        self._play( track.stream_url );
    });


    this.currentTrack = this.nextTrack; 
    this.nextTrack.obj = this.tracks[ this.currentTrack.index++ ]
    this.nextTrack.index = this.currentTrack.index++; 

}
// testing the soundcloud player

Posts.prototype._getSongsFromPlatform = function( platform, limit ) {
    var c = 0, 
        SCPosts = []; 

    for ( var i in this.list ) {
        if ( c < limit && this.list[ i ].platform === platform ) {
            SCPosts[ c ] = this.list[ i ]; 
            c++; 
        }
        // end of ( c < count )
    }

    return SCPosts; 
}

s = new SCPlayer( posts._getSongsFromPlatform( "soundcloud.com", 20 ) ); 
s.init(); 
//console.log( s.currentTrack )

function showOnDOM( info ) {
    var el = "<p class='active'>" + info + "</p>"; 
    $( "#content" ).find( 'p' ).removeClass( "active" ); 
    $( "#content" ).append( el ); 
}