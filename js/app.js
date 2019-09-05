
$(function(){

	// create a function that converts kelvin to farenheit
	function getFarenheit(kelvin){

		// first convert kelvin to celcius
		const celcius = kelvin - 273

		// then convert celcius to farenheit
		const farenheit = celcius * (9/5) + 32

		// return rounded down farenheit
		return Math.floor(farenheit)

	}

	// create an event handler function for the .submit() event
	$('#search').submit((event) => {

		// prevent the default behavior of the .submit() event
		// without this, the console confirmation message will flash and go away
		event.preventDefault()
		console.log('form submitted')

		// create a variable for the searched term
		const query = $('#query').val().toLowerCase()
		console.log(`search term: ${query}`)

		// pass variable into search function
		search(query)

	})

	// create a function to make the API request
	function search(query) {

		// hardcode from OWM
	    const url = 'https://api.openweathermap.org/data/2.5/weather'
	    const apiKey = '157d449680e8124c5c5c3c4ceecae869'

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

		    // pass the response into displayResults()
		    displayResults(response)

	    })

	    // execute this function if request fails
	    .fail((error) => {

		    console.log(`error: ${error}`)

		    displayError()


	    })

	}

	// create a function to display the response data from .done()
	function displayResults(weatherData){

		// pass kelvin data to getFarenheit()
		const currentTemp = getFarenheit(weatherData.main.temp)
		console.log(`farenheit: ${currentTemp}`)

		const maxTemp = getFarenheit(weatherData.main.temp_max)
		console.log(`farenheit max: ${maxTemp}`)

		const minTemp = getFarenheit(weatherData.main.temp_min)
		console.log(`farenheit min: ${minTemp}`)

		// format results into HTML table
		$('#displayResults').html(
			`<table>
				<thead>
					<tr>
						<th>${weatherData.name}</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td id="resultsDescription">${weatherData.weather[0].description}</td>
					</tr>
					<tr>
						<td class="resultsTemps">Right now: <span class="currentTemp">${currentTemp}&deg; F</span></td>
					</tr>
					<tr>
						<td class="resultsTemps">Today's range: ${maxTemp} - ${minTemp}&deg; F</td>
					</tr>
				</tbody>
			</table>`
		)

		// style results
		$('#displayResults').css('margin', '20px 0')

		if (currentTemp < 40) {
			$(".currentTemp").addClass("lowCurrentTemp")
		} else if (currentTemp > 90) {
			$(".currentTemp").addClass("highCurrentTemp")
		}

	}

	// create function to display error message below the input field
	function displayError(){

		$('#displayError').text('enter city name or zip code')

	}

})


