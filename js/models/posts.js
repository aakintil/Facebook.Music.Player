/////////////////////
// POST CLASS
/////////////////////
function Post( data ) { 
    if ( !data ) return;

    this.id = Math.random().toString( 36 ).substr( 2, 4 );
    this.name = data.name;  
    this.url = data.link || data.source; 
    this.platform = findPlatform( data );  
    this.author = data.from.name; // or the actual object
    this.img = data.full_picture || 'img/no.pic.png'; 
    this.posted = moment( data.created_time ).format('MMMM Do YYYY, h:mm:ss a'); 
    this.likes = 0 //|| data.likes.data.length; 

    function findPlatform( data ) {
        // if no links are available, we can't get the platform 
        if ( data.link === undefined && data.source === undefined ){
            return "UNKNOWN";   
        } 

        // at this point at least one won't be null
        var l = data.link || data.source; 

        // TODO: add more etch cases
        /////////////////////////////
        // if it's a youtube link
        if ( l.indexOf( 'youtube' ) !== -1 || l.indexOf( 'youtu.be' ) !== -1 ) {
            return "youtube"; 
        }
        // if it's a vimeo link
        if ( l.indexOf( 'vimeo' ) !== -1 ) {
            return "vimeo"; 
        }
        // if it's a soundcloud link
        if ( l.indexOf( 'soundcloud' ) !== -1 ) {
            return "soundcloud"; 
        }
        // if it's a vevo link
        if ( l.indexOf( 'vevo' ) !== -1 ) {
            return "vevo"; 
        }
        // if it's a spotify link
        if ( l.indexOf( 'spotify' ) !== -1 ) {
            return "spotify"; 
        }

        // if it's a spotify link
        if ( l.indexOf( 'hiphopengine' ) !== -1 ) {
            return "hip hop engine"; 
        }

        return "UNKNOWN"; 
    }
}


/////////////////////
// POST METHODS
/////////////////////
Post.prototype.getAuthor = function() { return this.author; }

Post.prototype.getPlatform = function() { return this.platform; }

Post.prototype.setAuthor = function( author )  { this.author = author }; 



/////////////////////
// POSTS CLASS
/////////////////////
function Posts() {
    console.log( "initializing posts" ); 
    // etch cases
    // list has to be an array OR a json object
    //    if ( list.constructor !== Array || typeof list !== 'object' ) {
    //        console.log( "input an array of json data, or one json object please..." ); 
    //        return; 
    //    }

    console.log( "creating the post list" ); 
    this.list = []; 

    // checking the count
    this.size = this.list.length;

    // authors and # of posts
    this.authors = {}; 
}

/////////////////////
// POSTS METHODS
/////////////////////
Posts.prototype.getSize = function() {
    return this.size; 
}

Posts.prototype.calculateAuthorCount = function() {
    console.log( "calculating" ); 
}

Posts.prototype.addPost = function( post ) {
    if ( hasLink( post ))
        this.list.push( post ); 
}

function hasLink( post ) {
    if ( post.url !== undefined ) { 
        return true;
    }
    return false; 
}

Posts.prototype.removePost = function( post ) {
    console.log( "removing post... " );
}

Posts.prototype.getAuthorStats = function( name ) {
    console.log( "getting author stats... " );
    return this.authors; 
}

Posts.prototype.getAuthors = function() {
    console.log( "getting authors... " );
}

Posts.prototype.setList = function( new_list ) {
    this.list = new_list; 
}

Posts.prototype.addOneToDOM = function( post ) {

}

Posts.prototype.addAllToDOM = function( authors ) {
    // grab the container
    var container = $( '#archive .main.container' ), 
        post = "", 
        row_num = 0, 
        row = $( '<div class="row"></div>' ); 

    for ( var i in this.list ) {
        post = this.list[ i ]
        // storing all data into appr. attributes
        var url = link = '<a target="_blank" href="' + post.url + '" class="link"> Listen & Watch </a>', 
            post_name = post.name,  
            // source = data[ i ].source; 
            img = post.img, 
            date = post.posted, 
            user = post.author; 

        // create the music post container
        // the first row has to support the side nav for authors. that's it
        //        var block_row = ( row_num === 0 ) ? $( '<div class="row">'
        //                                              + '<div class="block col-md-6">' 
        //                                              + '</div>' 
        //                                              + '</div>' ) 
        //        : $( '<div class="row">'
        //            + '<div class="block col-md-offset-3 col-md-6">' 
        //            + '</div>' 
        //            + '</div>' ), 

        var block_row = ( row_num === 0 ) ? $( '<div id="top-post" class="animated block col-md-offset-3 col-md-6"></div>' ) : $( '<div class="animated block col-md-offset-3 col-md-6"></div>'  ), 
            info = $( "<div class='info'></div>" );

        // checking to see if any of the fields are null
        info.append( '<p class="title">' + post_name + '</p>' ); 
        info.append( '<p class="user">' + user + '</p>' ); 
        info.append( '<p class="date"> Posted: ' + date + '</p>' ); 
        // block_row.find( '.block').append( '<p class="message">' + message + '</p>' ); 
        info.append( url ); 
        // block_row.find( '.block').append( '<p class="source">' + source + '</p>' ): do_nothing() ; 

        block_row.append( info ); 
        block_row.append( '<img class="picture" src="' + img + '"/>' ); 
        //        block_row.find( '.block' ).append( info ); 
        //        block_row.find( '.block').append( '<img class="picture" src="' + img + '"/>' ); 
        row.append( block_row ); 
        row_num++; 
    }
    // personal count for # of users...maybe even sources? 
    //( _.size( musicData.youtube ) > 0 ) ? debug( "ya") : debug( "fuck" );

    // adding the posts to the container 
    container.append( row ); 
    // add when everything is working
    //    container.prepend( authors.addAllToDOM() ); 
}


