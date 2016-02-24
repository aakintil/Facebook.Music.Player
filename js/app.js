$( document ).ready( function() {

    // TODO have to change hex values to rgb values for alpha numerics
    var colors = [ "BF55EC", "D91E18", "00B16A", "E87E04", "19B5FE" ], 
        randColor = ""; 
    
    // TODO come back and fix! 
    $( '.block' ).on( "mouseenter", function() {
        randColor = "#" + colors[ Math.floor( Math.random() * colors.length ) ];
        $( this ).find( '.info' ).css({ "background-color" : randColor }); 
    })
})