/////////////////////
// AUTHORS CLASS
/////////////////////
function Authors( data ) {
    // to simplify the author process
    var temp =[], 
        uniq = [];
    // I don't want duplicates in my array and i want to group the data by authors
    for ( var i in data ) {
        temp.push( data[ i ].from ); 
    }
    uniq = _.countBy( temp, "name" ); 
    this.list = uniq;
}

Authors.prototype.getAuthors = function() {
    return this.list; 
}

Authors.prototype.addOneAuthor = function( author ) {
    this.list.push( author );
    //not working properly for some weird reason
    // if it's empty just add it
    //    if ( this.list.length < 1 ) {
    //        this.list.push( author ); 
    //        return; 
    //    }
    //
    //    console.log( "adding author ", author.name)
    //    // otherwise, if it's not a duplicate, add it
    //    for ( var i in this.list ) {
    //        var index_name = this.list[ i ].name, 
    //            author_name = author.name; 
    //
    //        if ( author !== this.list[ i ] ) {
    //            this.list.push( author );
    //        } 
    //        //        console.log( "successfully added author" ); 
    //    }
}

Authors.prototype.clearAuthors = function() {
    this.list = []; 
}

Authors.prototype.removeAuthor = function( author ) {

}

Authors.prototype.consolidateAuthors = function( posts ) {

    var temp = []; 
    // removing duplicate names and grouping posts to an author
    for ( var i in this.list ) {
        // create another author
        var a = new Author( i ); 

        // loop through and find where else the author exists
        for ( var j = 0; j < posts.length; j++ ) {
            // if the name are the same, consolidate
            if ( posts[ j ].author === i ) {
                a.addOnePost( posts[ j ] ); 
                a.addToPostIdArray( posts[ j ].id ); 
            }
        }
        // add authors to temp object
        temp.push( a ); 
    }

    // check for authors with 0 posts + 
    // eliminate temp and set this.list back to main node
    this.list = minusZeroes( temp )
}

Authors.prototype.each = function() {
    for ( var i in this.list ) {
        console.log( "Author:Posts -->   ", this.list[ i ].name, ":", this.list[ i ].posts.length ); 
    }
}

Authors.prototype.addAllToDOM = function() {
    var author_block = $( '<div class="col-md-3"></div>' ), 
        _author = $( "<div></div>" ); 

    for ( var i in this.list ) {
        var author = this.list[ i ], 
            name = author.name, 
            post_count = author.posts.length, 
            obj = $( '<p> <span class="author">' + name + '</span> <span class="postsNum">' + post_count + '</span> </p>' ); 
        _author.append( obj ); 
    }

    // adding to the DOM 
    author_block.append( _author ); 
    return author_block; 
}

function minusZeroes( temp ) {
    var minus_zeroes = []; 
    for ( var i in temp ) {
        if ( temp[ i ].posts.length === 0 ) {
            minus_zeroes = _.reject( temp, function( author ){ return author.posts.length === 0 });
        }    
    }

    return minus_zeroes; 
}


/////////////////////
// AUTHOR CLASS
/////////////////////
function Author( name ) {
    this.name = name; 
    this.post_ids = []; 
    this.posts = []; 
}

Author.prototype.getPostIds = function() {
    return this.post_ids; 
}

Author.prototype.getPosts = function() {
    return this.posts; 
}

Author.prototype.internalInitPostIdArray = function( id ) {
    for ( var i in this.posts ) {
        this.post_ids.push( this.posts[ i ].id ); 
    }
}

Author.prototype.addToPostIdArray = function( id ) {
    this.post_ids.push( id ); 
}

Author.prototype.addPosts = function( post ) {
    for ( var i in post ) {
        if ( post[ i ].url !== undefined )
            this.posts.push( post[ i ] ); 
    }
}

Author.prototype.addOnePost = function( post ) {
    if ( post.url !== undefined )
        this.posts.push( post ); 
    //    else 
    // console.log( "cannot add post: the url is not provided" ); 
}

Author.prototype.removeOnePost = function( post ) {
    //    this.posts.push( post ); 
}




/////////////////////
// POST CLASS
/////////////////////
function Post( data ) { 
    if ( !data ) return;

    console.log( "initializing a post" );
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

Posts.prototype.addAllToDOM = function( authors ) {
    // grab the container
    var container = $( '#archive .main.container' ), 
        post = "", 
        row_num = 0; 
    for ( var i in this.list ) {
        post = this.list[ i ]
        // storing all data into appr. attributes
        var url = post.url, 
            post_name = post.name,  
            // source = data[ i ].source; 
            img = post.img, 
            date = post.posted, 
            user = post.author.name; 

        // create the music post container
        // the first row has to support the side nav for authors. that's it
        var block_row = ( row_num === 0 ) ? $( '<div class="row">'
                                                    + '<div class="block col-md-6">' 
                                                    + '</div>' 
                                                    + '</div>' ) 
        : $( '<div class="row">'
            + '<div class="block col-md-offset-3 col-md-6">' 
            + '</div>' 
            + '</div>' );

        // checking to see if any of the fields are null
        block_row.find( '.block').append( '<p class="title">' + post_name + '</p>' ); 
        block_row.find( '.block').append( '<p class="user">' + user + '</p>' ); 
        block_row.find( '.block').append( '<p class="date"> Posted: ' + date + '</p>' ); 
        // block_row.find( '.block').append( '<p class="message">' + message + '</p>' ); 
        block_row.find( '.block').append( url ); 
        // block_row.find( '.block').append( '<p class="source">' + source + '</p>' ): do_nothing() ; 
        block_row.find( '.block').append( '<img class="picture" src="' + img + '"/>' ); 

        container.append( block_row ); 
        row_num++; 
    }
    // personal count for # of users...maybe even sources? 
    //( _.size( musicData.youtube ) > 0 ) ? debug( "ya") : debug( "fuck" );

    console.log( authors )
    // adding the authors 
    
    container.find( '.row:first-child' ).prepend( authors.addAllToDOM() ); 
}

Posts.prototype.addOneToDOM = function( post ) {

}

var data = save_my_inbox.data, 
    authors = new Authors( data ),
    posts = new Posts(); 

function init() {
    var post = "", 
        author = ""; 

    for ( var i in data ) {
        post = new Post( data[ i ] ); 
        author = new Author( data[ i ].from.name ); // have to find a way to consolidate this. right now it's pulling from a very different data set. hence creating the Author with 0 posts issue.  
        author.addOnePost( post );
        post.setAuthor = author; 
        author.internalInitPostIdArray( post.id ); 
        posts.addPost( post ); 
    }

    // need this to make turn the duplicate list into more of a hash table
    authors.consolidateAuthors( posts.list );
}
init(); 

posts.authors = authors.list; 
//authors.each(); 
posts.addAllToDOM( authors );

// post is working
// p = new Post( save_my_inbox.data[ 0 ] ); 
// console.log( p ); 

// posts works
// posts = new Posts( save_my_inbox.data ); 