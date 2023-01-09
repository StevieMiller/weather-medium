// Global variables
var apiKey = '6a18942032d599aed45ad2d25a7e474d'
var searchBtnEl = document.getElementById('searchBtn')
var inputCityEl = document.getElementById('inputCity')
var inputStateEl = document.getElementById('inputState')
var inputCountryEl = document.getElementById('inputCountry')

let cityName;
let cityLat;
let cityLon;


// function calls the Open Weather API
function getApi() {
  console.log('clicked!');

  let cityChosen = inputCityEl.value
  let stateChosen = inputStateEl.value
  let countryChosen = inputCountryEl.value

  // var geocodeUrl gets the coordinates
  var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityChosen},${stateChosen},${countryChosen}&appid=${apiKey}`

  
  console.log(geocodeUrl);
  
  fetch(geocodeUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log("Data:", data)
    cityName = data[0].name;
    cityLat = data[0].lat;
    cityLon = data[0].lon;

    // let forecastUrl gets the 5 day / 3 hour forecast data
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`
    console.log(forecastUrl);
    
    

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

     getResponse(forecastUrl)
  });

  
    
}

async function getResponse(forecastUrl) {
  console.log(cityName)
	const response = await fetch(
		forecastUrl,
		{
			method: 'GET',
			// headers: {
			//	'x-rapidapi-key': apiKey
		//	}
		}
	).then((response) => response.json()).then((forecastData) => {
    get5Day(forecastData)
  })

}

function get5Day(forecastData) {
      for (let i = 0; i <= 4; i++) {
        let oneDay = forecastData.list[i]
        let date = oneDay.dt
        let icon = oneDay.weather[0].icon
        let tempMax = oneDay.main.temp_max
        let humidity = oneDay.main.humidity
        let windSpeed = oneDay.wind.speed

        

        showWeather(i, date, icon, tempMax, humidity, windSpeed)
      
      }
}


function showWeather(i, date, icon, tempMax, humidity, windSpeed) {
// Get weather data and append to page 
let element = document.getElementById("day" + i) // if this doesn't work, make i a string
element.innerHTML = `Date: ${date}\nIcon: ${icon}\nTemp: ${tempMax}\nHumidity: ${humidity}\nWind: ${windSpeed}\n`
console.log(element);
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