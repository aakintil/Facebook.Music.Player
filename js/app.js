function debug( type ) {
    var s = "** SUCCESS  ** \n (^.^) ", 
        e = " -- ERROR -- \n (%_%) "; 
    ( type === "ya" ) ? console.log( s ) : console.log( e ); 
}

function do_nothing() {
    return; 
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
    var container = $( '#archive .main.container' ); 

    // loop through data
    // TODO - change name of c to something more meaningful
    var c = 0, 
        musicData = { 
            youtube: {}, 
            vimeo: {}, 
            soundcloud: {}, 
            vevo: {}, 
            spotify: {} 
        }, 
        users = {}, 
        count, 
        youtube_data = ""; 

    //        youtube = "youtube", 
    //        you = "youtu.be",
    //        vimeo = 'vemeo', 
    //        soundcloud = 'soundcloud', 
    //        vevo = 'vevo', 
    //        spotify = 'spotify'; 

    // NOW WE HAVE EACH USER THAT'S POSTED ALONG WITH # OF POSTS
    _USERS = []
    _NAMES = []; 
    for ( var i in data ) {
        _NAMES.push( data[ i ].from ); 
    }
    _USERS = _.countBy( _NAMES, "name" )

    //    console.log( "name count: \n", _VA );

    // loop through each of the json facebook post objects
    for ( var i in data ) {

        // if there's a link, show it on the home page...we'll deal with no links later
        // ETCH CASE: the link could be in the title 
        if ( data[ i ].link !== undefined || data[ i ].source !== undefined ) {
            // console.log( data[ i ].name, "   || ", data[ i ].link ); 
            // create holding variables
            var message = "", 
                link = "", 
                source = "", 
                post_name = "", 
                img = "", 
                date = "", 
                user = "", 
                l = data[ i ].link; 

            // if it's a youtube link
            if ( l.indexOf( 'youtube' ) !== -1 || l.indexOf( 'youtu.be' ) !== -1 ) {
                musicData.youtube[ c ] = data[ i ]; 

                // storing only the youtube variables
                // message = ( data[ i ].message === undefined ) ? 'There are no messages for this post' : ( data[ i ].message );
                // link = ( data[ i ].link === undefined ) ? 'null' : data[ i ].link; 
                // post_name = data[ i ].name; 
                // source = data[ i ].source; 
            }

            // if it's a vimeo link
            if ( l.indexOf( 'vimeo' ) !== -1 ) {
                musicData.vimeo[ c ] = data[ i ]; 
            }
            // if it's a soundcloud link
            if ( l.indexOf( 'soundcloud' ) !== -1 ) {
                musicData.soundcloud[ c ] = data[ i ]; 
            }
            // if it's a vevo link
            if ( l.indexOf( 'vevo' ) !== -1 ) {
                musicData.vevo[ c ] = data[ i ]; 
            }
            // if it's a spotify link
            if ( l.indexOf( 'spotify' ) !== -1 ) {
                musicData.spotify[ c ] = data[ i ]; 
            }


            // storing all data into appr. attributes
            message = ( data[ i ].message === undefined ) ? 'There are no messages for this post' : ( data[ i ].message );
            link = ( data[ i ].link === undefined ) ? 'null' : data[ i ].link; 
            post_name = data[ i ].name; 
            source = data[ i ].source; 
            img = ( data[ i ].full_picture === undefined ) ? 'img/no.pic.png' : data[ i ].full_picture; 
            date = moment( data[ i ].created_time ).format('MMMM Do YYYY, h:mm:ss a'); 
            user = data[ i ].from.name; 

            // a function that places the link in an appropriate html link element
            var link_display = function( l ) {
                var link = ""; 
                ( l !== "null" ) ? link = '<a target="_blank" href="' + l + '" class="link"> Listen & Watch </a>' : link = ""; 
                return link; 
            }
            // moment().format('MMMM Do YYYY, h:mm:ss a'); // May 10th 2015, 3:15:09 pm

            // create the music post container
            var block_row = ( c === 0 ) ? $( '<div class="row">'
                                            + '<div class="block col-md-6">' 
                                            + '</div>' 
                                            + '</div>' ) 
            : $( '<div class="row">'
                + '<div class="block col-md-offset-3 col-md-6">' 
                + '</div>' 
                + '</div>' );

            // checking to see if any of the fields are null
            ( post_name.length > 1 ) ? block_row.find( '.block').append( '<p class="title">' + post_name + '</p>' ): do_nothing() ; 
            ( user.length > 1 ) ? block_row.find( '.block').append( '<p class="user">' + user + '</p>' ): do_nothing() ; 
            ( date.length > 1 ) ? block_row.find( '.block').append( '<p class="date"> Posted: ' + date + '</p>' ): do_nothing() ; 
            ( message.length > 1 ) ? block_row.find( '.block').append( '<p class="message">' + message + '</p>' ): do_nothing() ; 
            ( link.length > 1 ) ? block_row.find( '.block').append( link_display( link ) ): do_nothing() ; 
            ( source !== undefined ) ? block_row.find( '.block').append( '<p class="source">' + source + '</p>' ): do_nothing() ; 
            ( img.length > 1 ) ? block_row.find( '.block').append( '<img class="picture" src="' + img + '"/>' ): do_nothing() ; 

            container.append( block_row ); 
            c++; 
        }
    }
    // personal count for # of users...maybe even sources? 
    ( _.size( musicData.youtube ) > 0 ) ? debug( "ya") : debug( "fuck" );


    // adding the user 
    var user_row = $( '<div class="col-md-3"></div>' ), 
        name = "", 
        count = "", 
        user_obj = $( "<div></div>" ); 

    for ( var i in _USERS ) {
        var name = i + "", 
            obj = $( '<p> <span class="user">' + name + '</span> <span class="count">' + _USERS[ i ] + '</span> </p>' ); 
        user_obj.append( obj ); 
    }

    // adding to the DOM 
    user_row.append( user_obj ); 
    container.find( '.row:first-child' ).prepend( user_row ); 
    // checkout this for npm
    // https://www.npmjs.com/package/play-url
}); 