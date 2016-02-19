function debug( type ) {
    var s = "** SUCCESS  ** \n (^.^) ", 
        e = " -- ERROR -- \n (%_%) "; 
    ( type === "ya" ) ? console.log( s ) : console.log( e ); 
}

function get_url( text ) {
    // regex to get url and only urls
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    var url_regex = /(http|ftp|https):\/\/([\w\-_]+(?:(?:\.[\w\-_]+)+))([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/g; 

    return text.replace( urlRegex, function( url ) {
        //		return '<a href="' + url + '">' + url + '</a>';
        return url ;
    })
    // or alternatively
    // return text.replace(urlRegex, '<a href="$1">$1</a>')
}

$( document ).ready( function() {
    // VARIABLES
    // data declarations
    var smi = save_my_inbox.data, 
        funk = funktion.data, 
        superior = superior_music_group.data; 

    // data assocation or selection 
    var data = smi; 
    //	console.log( data.length ); 

    // placing and sorting data inside container
    var container = $( '#archive .container' ); 

    // loop through data
    var c = 0, 
        music = { 
            youtube: 0, 
            vimeo: 0, 
            soundcloud: 0, 
            vevo: 0, 
            spotify: 0
        }, 
        musicData = { 
            youtube: {}, 
            vimeo: {}, 
            soundcloud: {}, 
            vevo: {}, 
            spotify: {} 
        }, 
        count, 
        youtube_data = ""; 

    //        youtube = "youtube", 
    //        you = "youtu.be",
    //        vimeo = 'vemeo', 
    //        soundcloud = 'soundcloud', 
    //        vevo = 'vevo', 
    //        spotify = 'spotify'; 

    for ( var i = 0; i < 20; i++ ) {
        if ( data[ i ].link !== undefined || data[ i ].source !== undefined ) {
            //            var message = ( data[ i ].message === undefined ) ? 'There are no messages for this post' : ( data[ i ].message ), 
            //                link = ( data[ i ].link === undefined ) ? 'There are no links for this post': data[ i ].link, 
            //                title = data[ i ].title; 
            var message = "", 
                link = "", 
                source = "", 
                post_name = ""; 

            var l = data[ i ].link; 

            if ( l.indexOf( 'youtube' ) !== -1 || l.indexOf( 'youtu.be' ) !== -1 ) {
                music.youtube++; 
                musicData.youtube[ c ] = data[ i ]; 

                // storing only the youtube variables
                message = ( data[ i ].message === undefined ) ? 'There are no messages for this post' : ( data[ i ].message );
                link = ( data[ i ].link === undefined ) ? 'null' : data[ i ].link; 
                post_name = data[ i ].name; 
                source = data[ i ].source; 
            }

            if ( l.indexOf( 'vimeo' ) !== -1 ) {
                music.vimeo++; 
                musicData.vimeo[ c ] = data[ i ]; 
            }
            if ( l.indexOf( 'soundcloud' ) !== -1 ) {
                music.soundcloud++; 
                musicData.soundcloud[ c ] = data[ i ]; 
            }
            if ( l.indexOf( 'vevo' ) !== -1 ) {
                music.vevo++; 
                musicData.vevo[ c ] = data[ i ]; 
            }
            if ( l.indexOf( 'spotify' ) !== -1 ) {
                music.spotify++;
                musicData.spotify[ c ] = data[ i ]; 
            }



            var img = ( data[ i ].full_picture === undefined ) ? 'img/no.pic.png' : data[ i ].full_picture, 
                date = moment( data[ i ].created_time ).format('MMMM Do YYYY, h:mm:ss a'), 
                user = data[ i ].from.name, 
                link_display = function( l ) {
                    var link = ""; 
                    ( l !== "null" ) ? link = '<a target="_blank" href="' + l + '" class="link"> Listen & Watch </a>' : link = ""; 
                    return link; 
                }

            // moment().format('MMMM Do YYYY, h:mm:ss a'); // May 10th 2015, 3:15:09 pm
            var block = $( '<div class="row">'
                          + '<div class="block col-md-offset-3 col-md-6">' 
                          + '<p class="message">' + message + '</p>'
                          + link_display( link ) 
                          + '<p class="source">' + source + '</p>'
                          + '<p class="title">' + post_name + '</p>'
                          + '<p class="user">' + user + '</p>'
                          + '<p class="date"> Posted: ' + date + '</p>'
                          + '<img class="picture" src="' + img + '"/>'
                          + '</div>' 
                          + '</div>' );
            container.append( block ); 
            c++; 
        }
    }

    // console.log( musicData.youtube[ 1 ] ); 
    ( _.size( musicData.youtube ) > 0 ) ? debug( "ya") : debug( "fuck" );

    // checkout this for npm
    // https://www.npmjs.com/package/play-url
}); 