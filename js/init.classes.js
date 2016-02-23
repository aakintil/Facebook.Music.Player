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