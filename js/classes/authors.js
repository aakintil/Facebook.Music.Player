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

