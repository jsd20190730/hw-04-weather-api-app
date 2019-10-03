$(function () {
  $('#search').submit((event) => {
    event.preventDefault()
    console.log('submitting')
    const query = $('#query').val()
    openWeatherApi (query)
  })

  async function openWeatherApi (query) {
    try {
      const url = 'https://api.openweathermap.org/data/2.5/weather'
      const apiKey = 'a9774b2823a4f33972a6f727864cbae9'

      // make api request using axios
      const response = await axios.get(url, {
        params: {
          appid: apiKey,
          q: query,
          units: 'imperial'
        }
      })

      console.log(response)

      displayResults (response)
    } catch (e) {
      console.log(e)
    }
  }

  function displayResults (data) {
    console.log('data in displayResults:', data)

    $('#city-name').html(`<p>name: ${data.data.name}</p>`)
    $('#current-temperature').html(`<p>current temp: ${data.data.main.temp}</p>`)
    $('#weather-desc').html(`<p>current description: ${data.data.weather[0].description}
    </p>`)
    $('#min-temp').html(`<p>current min temp: ${data.data.main.temp_min}</p>`)
    $('#max-temp').html(`<p>current max temp: ${data.data.main.temp_min}</p>`)

  }


})
