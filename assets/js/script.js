// Global variables
let apiKey = '6a18942032d599aed45ad2d25a7e474d'
let searchBtnEl = document.getElementById('searchBtn')
let inputCityEl = document.getElementById('inputCity')
let inputStateEl = document.getElementById('inputState')
let inputCountryEl = document.getElementById('inputCountry')
let searchHistory = document.getElementById('searchHistory')

let cityName;
let cityLat;
let cityLon;

function initSearchHistory() {

  let cityChosen = inputCityEl.value

  localStorage.setItem("city", cityChosen);
  let city = localStorage.getItem("city")
  searchHistory.textContent = city;

  }


// function calls the Open Weather API
function getApi() {

  let cityChosen = inputCityEl.value
  let stateChosen = inputStateEl.value
  let countryChosen = inputCountryEl.value

  // let geocodeUrl gets the coordinates
  let geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityChosen},${stateChosen},${countryChosen}&appid=${apiKey}`
  
  fetch(geocodeUrl) // Gets geocode coordinates
  .then((response) => response.json()) // Converts data to JSON
  .then((data) => {
    cityName = data[0].name; // Gets city name
    cityLat = data[0].lat; // Gets latitude
    cityLon = data[0].lon; // Gets longitude

    // let forecastUrl gets the 5 day / 3 hour forecast data
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&units=imperial&appid=${apiKey}`

     getResponse(forecastUrl) // Gets 5 day forecast data
  });

initSearchHistory()  
renderSearch()

}

// async function gets all forecast data
async function getResponse(forecastUrl) { 
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



function renderSearch() {

  let cityChosen = inputCityEl.value

  localStorage.setItem("city", cityChosen);
  let city = localStorage.getItem("city")
  searchHistory.textContent = city;
  
  }

function get5Day(forecastData) {
      for (let i = 0; i <= 4; i++) { // Iterates through first five indices of weather data
        let oneDay = forecastData.list[i] // Gets today's weather data
        let date = oneDay.dt // Gets the date and time
        let icon = oneDay.weather[0].icon // Gets the weather icon
        let temp = oneDay.main.temp // Gets the temperature
        let humidity = oneDay.main.humidity // Gets the humidity
        let windSpeed = oneDay.wind.speed // Gets the wind speed
        
        show5DayWeather(i, date, icon, temp, humidity, windSpeed)
        showTodaysWeather(i, date, icon, temp, humidity, windSpeed)
      }
}

function show5DayWeather(i, date, icon, temp, humidity, windSpeed) {
// Get weather data and append to page 
let dateEl = document.createElement("p"); // Creates <p> element
let iconEl = document.createElement("img");
let tempEl = document.createElement("p");
let humidEl = document.createElement("p");
let windEl = document.createElement("p");
let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png"

iconEl.setAttribute("src", iconUrl);
dateEl.innerText = dayjs.unix(date).format('MMM D, YYYY'); // Formats date
iconEl.innerText = iconUrl; // Displays weather icon
tempEl.innerText = "Temp: " + temp + " °F"; // Displays temperature
humidEl.innerText = "Humidity: " + humidity + " %"; // Displays humidity
windEl.innerText = "Wind: " + windSpeed + " MPH"; // Displays wind speed

document.getElementById("day" + i).appendChild(dateEl); // Appends elements to DOM
document.getElementById("5day").appendChild(iconEl);
document.getElementById("day" + i).appendChild(iconEl);
document.getElementById("day" + i).appendChild(tempEl);
document.getElementById("day" + i).appendChild(humidEl);
document.getElementById("day" + i).appendChild(windEl);

}

function showTodaysWeather(i, date, icon, temp, humidity, windSpeed) {

let unixFormat = dayjs.unix(date).format('MMM D, YYYY'); // Gets today's date

let cityDisplay = document.getElementById("city") // Selects elements by id
let dateDisplay = document.getElementById("date")
let iconDisplay = document.getElementById("icon")
let tempDisplay = document.getElementById("temp")
let humidityDisplay = document.getElementById("humidity")
let windDisplay = document.getElementById("wind")

cityDisplay.textContent = (cityName) // Displays city
dateDisplay.textContent = (unixFormat) // Displays today's date
iconDisplay.textContent = (icon) // Displays weather icon
tempDisplay.textContent = ("Temp: " + temp + " °F") // Displays max temperature
humidityDisplay.textContent = ("Humidity: " + humidity + "%") // Displays humidity
windDisplay.textContent = ("Wind: " + windSpeed + " MPH") // Displays wind speed
  
}


// Fires getApi function when the search button is clicked
searchBtnEl.addEventListener('click', getApi);