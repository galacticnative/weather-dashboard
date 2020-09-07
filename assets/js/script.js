var apiKey = "&appid=a54d928deb07cd481fb394bc2e4e5499"
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
var forecastContainerEl = document.querySelector("#forecasts");


//function when the City entered button is clicked, will display weather data
var searchCity = function() {
    var searchInput = document.getElementById("city-input").value; 
    var apiKey = "&appid=a54d928deb07cd481fb394bc2e4e5499&units=imperial"


    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + apiKey
    ).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data);
        document.getElementById("location").innerHTML = data.name 

        currentTemp(data);
        currentHumid(data);
        currentWind(data);
        weatherIcon(data); 
        currentUv(data); 
        forecastData(data);
    }).catch(function(error) {
        console.log("Error, try again", error)
    });
}

//function to display current TEMP
var currentTemp = function(data) {
    var fahrenheit = Math.round(data.main.temp)
    return document.getElementById("weather-temp").innerHTML = "Temperature: " + fahrenheit + " °F"
}

//function to display current HUMIDITY
var currentHumid = function(data) {
    var humidity = data.main.humidity
    return document.getElementById("humid-current").innerHTML = "Humidity: " + humidity + "%"
}

//function to display current WIND
var currentWind = function(data) {
    var wind = data.wind.speed
    return document.getElementById("wind-current").innerHTML = "Wind Speed: " + wind + "mph"
}

var weatherIcon = function(data) {
    var iconEl = document.getElementById("weather-icon")
    var weatherIconImg = data.weather[0].icon
    console.log(weatherIconImg)
    var iconUrl = "https://openweathermap.org/img/wn/" + weatherIconImg + "@2x.png"
    iconEl.innerHTML = "<img src='" + iconUrl + "'>"
}

//function to display CURRENT UV INDEX
var currentUv = function(data) {
    var apiKey = "a54d928deb07cd481fb394bc2e4e5499"
    var apiUrl = "https://api.openweathermap.org/data/2.5/uvi?appid="
    
    var lat = data.coord.lat
    var lon = data.coord.lon

    fetch(apiUrl + apiKey + "&lat=" + lat + "&lon=" + lon
    ).then(function(response) {
        return response.json()
    }).then(function(data) {
        var uvCurrentEl = data.value
        var uvColor = document.getElementById("uv-current") 

        if (uvCurrentEl >= 0 && uvCurrentEl < 3) {
            uvColor.classList.add("bg-success");
        } else if (uvCurrentEl >= 3 && uvCurrentEl < 7) {
            uvColor.classList.add("bg-warning");
        } else if (uvCurrentEl >= 7) {
            uvColor.classList.add("bg-danger");
        }

        document.getElementById("uv-current").innerHTML = "UV Index: " + uvCurrentEl
    })
}

var now = moment().format("MM/DD/YYYY");
document.getElementById("current-date").innerHTML = now

//function to display 5 dayFORECAST
var forecastData = function(data) {
    apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
    apiKey = "&appid=a54d928deb07cd481fb394bc2e4e5499&units=imperial"
    var searchInput = document.getElementById("city-input").value;

    fetch(apiUrl + searchInput + apiKey).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
        console.log(data.list)
        //console.log(data.list[0])

        

        var forecastList = data.list
        for (var i = 0; i < forecastList.length; i+=8) {
        
            var weatherIconImg = data.list[i].weather[0].icon
            console.log(weatherIconImg)
            var iconUrl = "https://openweathermap.org/img/wn/" + weatherIconImg + "@2x.png"

        console.log([i])
        var date = moment(forecastList[i].dt_txt).add(1, "d").format("MM/DD/YYYY")
        var temp = Math.round(data.list[i].main.temp)
        var humid = data.list[i].main.humidity
        

        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "card text-white bg-primary mb-3")
        newDiv.setAttribute("style", "max-width: 25rem; max-height: 30rem;")
        newDiv.innerHTML = date + "<img src='" + iconUrl + "'>" + "<br>" + "Temp: " + temp + " °F" + "<br>" + "Humidity: " + humid + "%"



        forecastContainerEl.appendChild(newDiv)






        }
    })  
}      
