const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentCity = document.createElement("h1")
const nowWeather = document.getElementById("current-weather");

// create a searchform submit and add a function that gets lat, lon, and city name
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let search = searchInput.value.trim();

    let apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`
    //we then fetch the api and then create a response function
    fetch(apiURL).then(function(response) {
        return response.json()
    }).then (function(data) {
        if(data.length == 0) {
            alert("Location not found, please try again");
        }

        else {
            let lat = data[0].lat;
            let lon = data[0].lon;
            let city = data[0].city;
            // lattitude longitude city 
            fetchWeather(lat, lon, city);
        } 
    })

    searchInput.value = "";
})

// now we create a fetchweather function with parameters of lat, lon and city
function fetchWeather (lat, lon, city) {
    let apiURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY2}`
    
// create a new function that fetches api, then creates response
    fetch(apiURL).then(function(response) {
        return response.json()
    }).then (function(data) {
        
        // create new header using const currentCity
        currentCity.textContent = city;
        nowWeather.appendChild(currentCity);

        console.log(data);

        // declare variables using the info from console.log(data)
        let tempF = data.current.temp;
        let windMph = data.current.wind;
        let humidity = data.current.humidity;

        // print out temp, wind, and humidity
        // to do, UV index
        let nowTemp = document.createElement("p")

        nowTemp.textContent = "Temp: " + tempF + " F";
        nowWeather.appendChild(nowTemp);

        let nowWind = document.createElement("p")
   
        nowWind.textContent = "Wind: " + windMph + " MPH";
        nowWeather.appendChild(nowWind);

        let nowHumidity = document.createElement("p")
    
        nowHumidity.textContent = "Humidity: " + humidity;
        nowWeather.appendChild(nowHumidity);

        let forecast = document.createElement("h1")
        let currentForecastContainer = document.getElementById("current-forecast");
        forecast.textContent = "5 day Forecast";
        currentForecastContainer.appendChild(forecast);

        let dailyForecast = data.daily;
        
        console.log(dailyForecast)

       



    })
}

