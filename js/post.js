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
    // eliminate temp and set this.list back to main node
    this.list = temp; 
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
        this.posts.push( post[ i ] ); 
    }
}

Author.prototype.addOnePost = function( post ) {
    this.posts.push( post ); 
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
    this.author = data.from.name; 
    this.img = data.full_picture || ""; 
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
    this.list.push( post ); 
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

Posts.prototype.addAllToDOM = function() {
    console.log( $( 'body' ) ); 
}

Posts.prototype.addOneToDOM = function( post ) {

}


function init() {
    data = save_my_inbox.data, 
        authors = new Authors( data ), 
        posts = new Posts(); 

    for ( var i in data ) {
        var p = new Post( data[ i ] ); 
        var a = new Author( data[ i ].from.name ); 
        a.addOnePost( p );
        a.internalInitPostIdArray( p.id ); 
        posts.addPost( p ); 
    }

    // need this to make turn the duplicate list into more of a hash table
    authors.consolidateAuthors( posts.list );
    console.log( authors.list[ 0 ] ); 
}
init(); 

posts.addAllToDOM();

// post is working
// p = new Post( save_my_inbox.data[ 0 ] ); 
// console.log( p ); 

// posts works
// posts = new Posts( save_my_inbox.data ); 