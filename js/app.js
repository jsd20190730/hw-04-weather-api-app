
$(function(){

	// create an event handler function for the .submit() event
	$('#search').submit((event) => {

		// prevent the default behavior of the .submit() event
		// without this, the console confirmation message will flash and go away
		event.preventDefault()
		console.log('form submitted')

		// create a variable for the searched term
		const query = $('#query').val().toLowerCase()
		console.log(`search term: ${query}`)

		// run the search function, created below, with the above variable as the argument
		search(query)

	})

	// create a function to display the HTTP response

	// create a function to make the API request
	function search(query) {

		// hardcode from OWM
	    const url = 'https://samples.openweathermap.org/data/2.5/weather'
	    const apiKey = ''

	    $.ajax({
		    url: url,
		    type: 'GET',
		    // with a GET request, passing data allows you to structure query params
			// $.ajax() will convert the keys to strings with quotes, behind the scenes
		    data: { q: query, appid: apiKey }
	    })
	    
	    // execute this function if request is successful
	    .done((response) => {
	    	// console logging the response will help you know what to do with it
		    console.log(response)
	    })

	    // execute this function if request fails
	    .fail(() => {
		    console.log('fail')
	    })

	}

})


