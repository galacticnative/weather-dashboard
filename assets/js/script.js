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
        document.getElementById("location").innerHTML = data.name;

        currentTemp(data);
    }).catch(function(error) {
        console.log("Error, try again", error)
    });
}

//function to display current weather
var currentTemp = function(data) {
    var kelvin = data.main.temp 
    var celsius = kelvin - 273
    var fahrenheit = Math.floor(celsius * (9/5) + 32)
    return document.getElementById("weather-temp").innerHTML = "Temperature: " + fahrenheit + " degrees F"
}

// var now = moment().format("MM/DD/YYYY");
// document.getElementById("currentDate").innerHTML = now
        

