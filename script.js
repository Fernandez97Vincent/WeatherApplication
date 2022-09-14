const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
var fiveDay = document.querySelector(".day5");
let fiveTemp = document.querySelector("temp");



// create a searchform submit and add a function that gets lat, lon, and city name
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var search = searchInput.value.trim();

    var apiURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`
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
            let city = data[0].name;
            // lattitude longitude city 
            fetchWeather(lat, lon, city);
        } 
    })

    searchInput.value = "";
})

// now we create a fetchweather function with parameters of lat, lon and city
function fetchWeather (lat, lon, city) {
    var apiURL = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY2}`
    
// create a new function that fetches api, then creates response
    fetch(apiURL).then(function(response) {
        return response.json()
    }).then (function(data) {
        
        // create new header using const currentCity

        console.log(data);

        // declare variables using the info from console.log(data)
        let tempF = data.current.temp;
        let windMph = data.current.wind_speed;
        let humidity = data.current.humidity;
        let uvIndex = data.current.uvi;

        // print out temp, wind, and humidity
        // to do, UV index
        //let nowTemp = document.createElement("p")

        const nowTemp = document.querySelector("#todayTemp");
        const nowCity = document.querySelector("#cityName");
        const nowWind = document.querySelector("#todayWind");
        const nowUv = document.querySelector("#todayUv");
        const nowHumidity = document.querySelector("#todayHumidity");

        /*
        if (humidity <= 2) {
            nowUv.classList.add("goodUv");
        }

        else if (humidity >= 3) {
            nowUv.classList.add("okayUv")
        }

        else if (humidity >= 6) {
            nowUv.classList.add("moderateUv")
        }

        else if (humidity >= 8) {
            nowUv.classList.add("badUv")
        }

        else 
            nowUv.classList.add("vBadUv")
            */
        

        nowTemp.textContent = "Temp: " + tempF + " F";
        nowHumidity.textContent = "Humidity: " + humidity + "%";
        nowCity.textContent = "City: " + city;
        nowWind.textContent = "Wind: " + windMph + " MPH";
        nowUv.textContent = "UV Index: " + uvIndex;

       

        let forecast = document.createElement("h1")
        let currentForecastContainer = document.getElementById("current-forecast");
        forecast.textContent = "5 day Forecast";
        currentForecastContainer.appendChild(forecast);

        let dailyForecast = data.daily;
        
        console.log(dailyForecast)

        
        for(let i = 0; i < dailyForecast.length; i++){
        
            var currentForecastTemp = document.createElement("p");
             currentForecastTemp.textContent = `Temp: ${dailyForecast[i].temp.day}`
             console.log(dailyForecast[i].temp.day)
            currentForecastContainer.appendChild(currentForecastTemp);

            var currentForecastWind = document.createElement("p");
            currentForecastWind.textContent = `Wind: ${dailyForecast[i].wind_speed}`
 
           currentForecastContainer.appendChild(currentForecastWind);

            //fiveDay.textContent = "Temp: " + dailyForecast[humidity];

       }
       
       



    })
}

