// Global variables
let apiKey = '6a18942032d599aed45ad2d25a7e474d'
let searchBtnEl = document.getElementById('searchBtn')
let inputCityEl = document.getElementById('inputCity')
let inputStateEl = document.getElementById('inputState')
let inputCountryEl = document.getElementById('inputCountry')

let cityName;
let cityLat;
let cityLon;






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








function get5Day(forecastData) {
      for (let i = 0; i <= 4; i++) {
        let oneDay = forecastData.list[i]
        let date = oneDay.dt
        let icon = oneDay.weather[0].icon
        let temp = oneDay.main.temp
        let humidity = oneDay.main.humidity
        let windSpeed = oneDay.wind.speed
        
        show5DayWeather(i, date, icon, temp, humidity, windSpeed)
        showTodaysWeather(i, date, icon, temp, humidity, windSpeed)
      }
}








function show5DayWeather(i, date, icon, temp, humidity, windSpeed) {
// Get weather data and append to page 
//let dayCard = document.getElementById("day" + i)
//dayCard.innerHTML = `Date: ${date}\nIcon: ${icon}\nTemp: ${temp}\nHumidity: ${humidity}\nWind: ${windSpeed}\n`

let dateEl = document.createElement("p");
let iconEl = document.createElement("p");
let tempEl = document.createElement("p");
let humidEl = document.createElement("p");
let windEl = document.createElement("p");


dateEl.innerText = dayjs.unix(date).format('MMM D, YYYY');;
iconEl.innerText = icon;
tempEl.innerText = temp + " °F";
humidEl.innerText = humidity + " %";
windEl.innerText = windSpeed + " MPH";


document.getElementById("day" + i).appendChild(dateEl);
document.getElementById("day" + i).appendChild(iconEl);
document.getElementById("day" + i).appendChild(tempEl);
document.getElementById("day" + i).appendChild(humidEl);
document.getElementById("day" + i).appendChild(windEl);



}









function showTodaysWeather(i, date, icon, temp, humidity, windSpeed) {

let unixFormat = dayjs.unix(date).format('MMM D, YYYY'); // Gets today's date

let cityDisplay = document.getElementById("city")
let dateDisplay = document.getElementById("date")
let iconDisplay = document.getElementById("icon")
let tempDisplay = document.getElementById("temp")
let humidityDisplay = document.getElementById("humidity")
let windDisplay = document.getElementById("wind")

cityDisplay.textContent = (cityName) // Displays city
dateDisplay.textContent = (unixFormat) // Displays today's date
iconDisplay.textContent = (icon) // Displays weather icon
tempDisplay.textContent = ("Temp: " + temp) // Displays max temperature
humidityDisplay.textContent = ("Humidity: " + humidity + "%") // Displays humidity
windDisplay.textContent = ("Wind Speed: " + windSpeed + " MPH") // Displays wind speed



  
}




// Fires getApi function when the search button is clicked
searchBtnEl.addEventListener('click', getApi);