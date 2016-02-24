// SOURCE:
// http://www.robsawyer.me/blog/2013/07/10/lightweight-jquery-searchfilter-tutorial/

$( document ).ready( function() {

    // we want this function to fire whenever the user types in the search-box
    $( "#search-posts" ).keyup( function () {

        // first we create a variable for the value from the search-box
        var searchTerm = $( "#search-posts" ).val();

        // then a variable for the post items (to keep things clean)
        var posts = $( '#archive' ).find( '.block' ); 


        // extends the default :contains functionality to be case insensitive
        // if you want case sensitive search, just remove this next chunk
        $.extend( $.expr[':'], {
            'containsi': function( elem, i, match, array )
            {
                return ( elem.textContent || elem.innerText || '').toLowerCase()
                    .indexOf( ( match[3] || "" ).toLowerCase() ) >= 0;
            }
        });
        // end of case insensitive chunk


        // this part is optional
        // here we are replacing the spaces with another :contains
        // what this does is to make the search less exact by searching all words and not full strings
        var searchSplit = searchTerm.replace( / /g, "'):containsi('" )


        // here is the meat. We are searching the list based on the search terms
        $( posts ).not( ":containsi('" + searchSplit + "')" ).each( function( e )   {
            // add a "hidden" class that will remove the item from the list
            $( this ).addClass( 'hidden' );
        });

        // trying to change the class of the visible one to reflect changes
        // any item that's part of the search should not have an offset
        $( posts ).find( ":containsi('" + searchSplit + "')" ).each( function( e )   {

        });

        //////////////////////

        // this does the opposite -- brings items back into view
        $( posts ).find( ":containsi('" + searchSplit + "')" ).each( function( e ) {
            //remove the hidden class (reintroduce the item to the list)
            $( this ).parent( '.block' )
                .removeClass( 'hidden' ); 
        });



        //        // here is the meat. We are searching the list based on the search terms
        //        $( listItem ).not( ":containsi('" + searchSplit + "')" ).each( function( e )   {
        //
        //            // add a "hidden" class that will remove the item from the list
        //             $( this ).parent( '.block' ).not( "#top-post" ).addClass( 'col-md-offset-3' );
        //
        //        });


    })
}); 