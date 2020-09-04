var apiKey = "&appid=a54d928deb07cd481fb394bc2e4e5499"
var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="


//function when the City entered button is clicked, will display weather data
var searchCity = function() {
    var searchInput = document.getElementById("city-input").value; 
    var apiKey = "&appid=a54d928deb07cd481fb394bc2e4e5499"


    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + searchInput + apiKey
    ).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data);
        document.getElementById("location").innerHTML = data.name 

        currentTemp(data);
        currentHumid(data);
        currentWind(data);
        //weatherIcon(data); //need to link correct icon api key
        //currentUv(data); need correct api key for UV
        forecastData(data);
    }).catch(function(error) {
        console.log("Error, try again", error)
    });
}

//function to display current TEMP
var currentTemp = function(data) {
    var kelvin = data.main.temp 
    var celsius = kelvin - 273
    var fahrenheit = Math.floor(celsius * (9/5) + 32)
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

// var weatherIcon = function(data) {
//     var iconEl = document.getElementById("weather-icon")
//     iconEl.getAttribute("src")
//     iconEl.innerHTML = "http://openweathermap.org/img/wn/" + data.weather.icon + "@2x.png"
// }

//NEED API KEY for UV 
// var currentUv = function(data) {
//     var apiKey = "&appid=a54d928deb07cd481fb394bc2e4e5499"
//     var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="
//     var searchInput = document.getElementById("city-input").value; 

//     fetch(apiUrl + searchInput + "&exclude=hourly,daily" + apiKey
//     ).then(function(response) {
//         return response.json()
//     }).then(function(data) {
//         console.log(data);
//         document.getElementById("uv-current").innerHTML = data.uvi
//     })
// }

var now = moment().format("MM/DD/YYYY");
document.getElementById("current-date").innerHTML = now


var forecastData = function(data) {
    apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q="
    apiKey = "&appid=a54d928deb07cd481fb394bc2e4e5499"
    var searchInput = document.getElementById("city-input").value;

    var oneDay = new moment().add(1, 'day')
    var oneDaySeconds = (Math.round(new Date().getTime() / 1000)) + 86400
    
    // var forecastDiv = document.getElementById("forecast")
    // forecastDiv.className("card text-white bg-primary mb-3")
    // forecastDiv.style("max-width: 15rem;")
    
    var forecastOne = document.getElementById("forecast-date")
    forecastOne.innerHTML = oneDay.format("MM/DD/YYYY")

    fetch(apiUrl + searchInput + apiKey).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)

        if (oneDaySeconds === data.dt) {
            var kelvin = data.main.temp 
            var celsius = kelvin - 273
            var fahrenheit = Math.floor(celsius * (9/5) + 32)
            var forecastTemp = data.list.main.temp
            return document.getElementById("forecast-temp").innerHTML = forecastTemp
        }
    })  
}      
