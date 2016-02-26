$( document ).ready( function() {

    // TODO have to change hex values to rgb values for alpha numerics
    var rgbValues = [ "rgba( 191, 85, 236, 0.9 )", "rgba( 217, 30, 24, 0.9 )", "rgba( 0, 177, 106, 0.9 )", "rgba( 232, 126, 4, 0.9 )", "rgba( 25, 181, 254, 0.9 )" ], 
        randColor = ""; 

    // TODO come back and fix! 
    $( '.block' ).on( "mouseenter", function() {
        randColor = rgbValues[ Math.floor( Math.random() * rgbValues.length ) ];
        $( this ).find( '.info' ).css({ "background-color" : randColor }); 
    })
})