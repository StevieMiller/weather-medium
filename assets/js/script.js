// Global variables
var apiKey = '6a18942032d599aed45ad2d25a7e474d'
var searchBtnEl = document.getElementById('searchBtn')
var inputCityEl = document.getElementById('inputCity')
var inputStateEl = document.getElementById('inputState')
var inputCountryEl = document.getElementById('inputCountry')

// function calls the Open Weather API
function getApi() {
  console.log('clicked!');

  let cityChosen = inputCityEl.value
  let stateChosen = inputStateEl.value
  let countryChosen = inputCountryEl.value

  var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityChosen},${stateChosen},${countryChosen}&appid=${apiKey}`

  
  console.log(geocodeUrl);
  
  fetch(geocodeUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    let cityName = data.name;
    let cityLat = data.lat;
    let cityLon = data.lon;
    
    var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`
    //getResponse(forecastUrl, cityName, cityLat, cityLon)
    // fetch(forecastUrl)
    // .then((res) => res.json())
    // .then((forecastData) => console.log(forecastData));

    // let cityInfo = {
    //   country: '',
    //   lat: '',
    //   lon: '',
    //   name: '',
    //   state: ''
    // }
    // cityInfo[country] = data.country;
    // cityInfo[lat] = data.lat;
    // cityInfo[lon] = data.lon;
    // cityInfo[name] = data.name;
    // cityInfo[state] =  data.state;

   
  });
    
}

async function getResponse(forecastUrl, cityName, cityLat, cityLon) {
	const response = await fetch(
		forecastUrl,
		{
			method: 'GET',
			headers: {
				'x-rapidapi-key': apiKey
			}
		}
	).then((forecastData) => {
    console.log(forecastData)
  })
}

// Fires getApi function when the search button is clicked
searchBtnEl.addEventListener('click', getApi);

// Write function that displays the current day weather in the top container on page
// function todaysWeather()
  // Create query selectors to grab ids from HTML and store in variables
  // Append HTML and CSS to page for current day

  
// Write function that displays the 5 day forecast to cards on page
// function fiveDayForecast()
  // Create query selectors to grab ids from HTML and store in variables
  // Append HTML and CSS to page for all 5 weather cards