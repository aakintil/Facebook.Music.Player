// SOURCE:
// http://www.robsawyer.me/blog/2013/07/10/lightweight-jquery-searchfilter-tutorial/
// TODO: add NO RESULTS + # of results clause to the UI

$( document ).ready( function() {

    // we want this function to fire whenever the user types in the search-box
    $( "#search-posts" ).keyup( function () {

        // first we create a variable for the value from the search-box
        var searchTerm = $( "#search-posts" ).val();

        // then a variable for the post items (to keep things clean)
        var posts = $( '#archive' ).find( '.block' ); 


        // TODO, understand this
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
            // hard to animate display:none...so we use jquery
            // slide up instead
            $( this ).removeClass('fadeIn')
                .addClass( 'fadeOutUp' )
                .slideUp({ duration: 900, easing: "easeInOutCirc" }); 
        });

        // this does the opposite -- brings items back into view
        $( posts ).find( ":containsi('" + searchSplit + "')" ).each( function( e ) {
            // remove the hiding class just for information sake
            // slide back down all the visible ones
            $( this ).parent( '.block')
                .removeClass( 'fadeOutUp' )
                .addClass( 'fadeIn' )
                .slideDown({ duration: 950, easing: "easeInOutCirc" }); 
        });
    })
}); 