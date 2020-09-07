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
        weatherIcon(data); //need to link correct icon api key
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
    var weatherIcon = data.weather[0].icon
    iconEl.innerHTML = "<img src=\"https://openweathermap.org/img/wn/\" + weatherIcon + \"@2x.png/;SameSite=none;Secure\">"
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

    // var oneDay = new moment().add(1, "day");
    // var twoDay = new moment().add(2, "day");
    // var threeDay = new moment().add(3, "day");
    // var fourDay = new moment().add(4, "day");
    // var fiveDay = new moment().add(5, "day");
    //var oneDaySeconds = (Math.round(new Date().getTime() / 1000)) + 86400
    
    // var forecastDiv = document.getElementById("forecast")
    // forecastDiv.className("card text-white bg-primary mb-3")
    // forecastDiv.style("max-width: 15rem;")
    
    // var forecastOne = document.getElementById("forecast-date")
    // forecastOne.innerHTML = oneDay.format("MM/DD/YYYY")
    // var forecastTwo = document.getElementById("forecast-date1")
    // forecastTwo.innerHTML = twoDay.format("MM/DD/YYYY")

    fetch(apiUrl + searchInput + apiKey).then(function(response) {
        return response.json()
    }).then(function(data) {
        console.log(data)
        console.log(data.list)
        //console.log(data.list[0])


        // document.getElementById("forecast-temp").innerHTML = "Temperature: " + Math.round(data.list[0].main.temp) + " °F"
        // document.getElementById("forecast-humid").innerHTML = "Humidity: " + data.list[0].main.humidity + "%"
        
        // console.log(data.list[8])

        // document.getElementById("forecast-temp1").innerHTML = "Temperature: " + Math.round(data.list[8].main.temp) + " °F"
        // document.getElementById("forecast-humid1").innerHTML = "Humidity: " + data.list[8].main.humidity + "%"

        var forecastList = data.list
        for (var i = 0; i < forecastList.length; i+=8) {

        console.log([i])
        var date = moment(forecastList[i].dt_txt).add(1, "d").format("MM/DD/YYYY")
        var temp = Math.round(data.list[i].main.temp)
        var humid = data.list[i].main.humidity
        

        var newDiv = document.createElement("div");
        newDiv.setAttribute("class", "card text-white bg-primary mb-3")
        newDiv.setAttribute("style", "max-width: 25rem; max-height: 30rem;")
        newDiv.innerHTML = date + "<br>" + "Temp: " + temp + " °F" + "<br>" + "Humidity: " + humid + "%"



        forecastContainerEl.appendChild(newDiv)






        }
    })  
}      
