/////////////////////
// PLAYER CLASS
/////////////////////
function SCPlayer( tracks ) {
    // to simplify the author process
    this.widget = ""; 

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

    this.widget1 = ""; 
    this.widget2 = ""; 
}

SCPlayer.prototype.init = function() {
    SC.initialize({
        client_id: '5882f6425263623d4e9ec15bf3de1c9a', 
        redirect_uri: "http://localhost:8000/soundcloud.html"
    });

    this.currentTrack.obj = this.tracks[ 0 ]; 
    this.currentTrack.index = 0; 
    this.nextTrack.obj = this.tracks[ 1 ]; 
    this.nextTrack.index = 1; 
}

SCPlayer.prototype.play = function() {

    if ( this.isPaused ) {
        //    var track_url = 'https://soundcloud.com/dubbeldutch/bubble-ball-riddim-dubbel';
        SC.oEmbed( this.currentTrack.obj.url, { auto_play: true }).then( function( oEmbed ) {
            //        console.log('oEmbed response: ', oEmbed);
            console.log( "soundcloud player loading..." ); 
            $( "#content" ).append( oEmbed.html )
            console.log( "** soundcloud player loaded **" ); 
        });
    }
}

SCPlayer.prototype.pause = function() {

    if ( this.isPlaying ) {

    }
}

SCPlayer.prototype.next = function() {

    $( "#content" ).empty(); 
    this.currentTrack = this.nextTrack; 
    this.nextTrack.obj = this.tracks[ this.currentTrack.index++ ]
    this.nextTrack.index = this.currentTrack.index++; 

    SC.oEmbed( this.currentTrack.obj.url, { auto_play: true }).then( function( oEmbed ) {
        //        console.log('oEmbed response: ', oEmbed);
        console.log( "soundcloud player loading..." ); 
        $( "#content" ).append( oEmbed.html )
        console.log( "** soundcloud player loaded **" ); 
    });
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
console.log( s.currentTrack )