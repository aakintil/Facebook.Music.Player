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
	var container = $( '.header' ); 

	// loop through data
	var c = 0; 
	var youtube_data = ""; 
	for ( var i in data ) {
		if ( data[ i ].link !== undefined ) {
			var message = ( data[ i ].message === undefined ) ? 'There are no messages for this post' : ( data[ i ].message );
			var link = ( data[ i ].link === undefined ) ? 'There are no links for this post': data[ i ].link;
			var title = data[ i ].title ; 

			var img = ( data[ i ].full_picture === undefined ) ? 'img/no.pic.png' : data[ i ].full_picture; 
			var date = moment( data[ i ].created_time ).format('MMMM Do YYYY, h:mm:ss a');
			var user = data[ i ].from.name; 
			//			moment().format('MMMM Do YYYY, h:mm:ss a'); // May 10th 2015, 3:15:09 pm
			var block = $( '<div class="block">' 
						  + '<p class="message">' + message + '</p>'
						  + '<p class="link">' + link + '</p>'
						  + '<p class="title">' + title + '</p>'
						  + '<p class="user">' + user + '</p>'
						  + '<p class="date"> Posted: ' + date + '</p>'
						  + '<img class="picture" src="' + img + '"/>'
						  + '</div>' );
			container.append( block ); 
			c++; 
		}
	}
	console.log( "data count:  ", data.length, "  |  live link count:  ", c ); 
	var a = new Audio( "https://www.youtube.com/watch?v=Ozr4KsZBTvQ" ) ;
	//	if ( a ) { console.log( a , " the audio file exists " ); a.play() }

	// checkout this for npm
	// https://www.npmjs.com/package/play-url
}); 