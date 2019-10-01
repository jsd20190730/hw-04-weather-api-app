$(function() {

  $('#search').submit((event) => {
    event.preventDefault()
    console.log('form being submitted')

    const query = $('#query').val()
    console.log(query)

    $('#results-table tbody').html('')
    $('#query').val('')

    search(query)
  })

  //fix this
  function displayResults(weather) {

    // use index of gifs to increment counter for gifsagain
    $('#results-table tbody').html(
      `<tr>
            <td>${weather.name}</td>
            <td>${getFarenheit(weather.main.temp)}</td>
            <td>${weather.weather[0].description}</td>
            <td>${getFarenheit(weather.main.temp_max)}</td>
            <td>${getFarenheit(weather.main.temp_min)}</td>
          </tr>`
    )
  }

  //note added async to function
  async function search(searchTerm) {

    try {

      const weatherURL = 'https://api.openweathermap.org/data/2.5/weather' //api endpoint at Openweather
      const weatherKey = 'eb032ac2fb9ecc32480a3550a7a97189'

      // openweather api
      const responseWeather = await axios.get(
        weatherURL, {
          params: {
            q: searchTerm,
            appid: weatherKey
          }
        })

      console.log((responseWeather.data))

      // pass array as function params
      displayResults(responseWeather.data)

    } catch (error) {
      console.log(error)
      alert("Oh oh, something went wrong!")
    }
  }
})


function getFarenheit(kelvin) {

  const celcius = kelvin - 273

  const farenheit = celcius * (9 / 5) + 32

  return Math.floor(farenheit)

}
