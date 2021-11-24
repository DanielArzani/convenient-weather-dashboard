//todo STEP 1. FETCH WEATHER BASED ON CITY NAME WHEN FORM HEARS SUBMIT EVENT
//todo STEP 2. HAVE CITY NAME BECOME THE TEXT OF THE A BUTTON IN SEARCH HISTORY
//todo STEP 3. HAVE CITY NAME APPEAR IN CURRENT WEATHER SECTION
//todo STEP 4. HAVE TEMP,WIND,HUMIDITY,UV-INDEX VALUES APPEAR IN CURRENT WEATHER SECTION

//* VARIABLES
// Form
const form = document.querySelector("form");
// Form Input
const input = document.querySelector('input[type="text"]');
// Search Button
const searchBtn = document.querySelector("#search-btn");
// API Key
const apiKey = "39e9d7b8c29775b4c2b37ed1510b744a";
// Search History
const searchHistory = document.querySelector("#search-history");

// City Name in Current Weather Section
const currentLocation = document.querySelector(".location");
// Current Temp
const currentTemp = document.querySelector(".current-temp");
// Current Wind
const currentWind = document.querySelector(".current-wind");
// Current Humidity
const currentHumidity = document.querySelector(".current-humidity");
// Current UV Index
const currentUV = document.querySelector(".current-uv");

// Future Temp
const temp = document.querySelectorAll(".temp");
// Future Wind
const wind = document.querySelectorAll(".wind");
// Future Humidity
const humidity = document.querySelectorAll(".humidity");

//* FUNCTIONS

// Function that gives weather info
const weatherData = function (e) {
  // Prevents site from re-loading upon form submit
  e.preventDefault();

  // Variable that stores value of what is submitted through the form
  const inputValue = input.value;

  // OneWeatherMap API URL with the city name typed and the api key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial&current`;

  // Weather Forecast for more than one time stamp
  const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}&units=imperial&current&cnt=5`;

  // Fetch weather data
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.main.humidity);
      // Adds city name to current weather section
      currentLocation.textContent = data.name;
      // Adds city name to search history button
      const span = document.createElement("span");
      span.classList.add(
        "city-name",
        "py-1",
        "my-2",
        "w-100",
        "btn",
        "bg-secondary"
      );
      span.textContent = data.name;
      searchHistory.append(span);
      // Sets TEMP,WIND,HUMIDITY,UV-INDEX values in current weather section
      currentTemp.textContent = `Temp: ${data.main.temp}°F`;
      currentWind.textContent = `Wind: ${data.wind.speed} MPH`;
      currentHumidity.textContent = `Humidity: ${data.main.humidity} %`;
      // TODO ASK ABOUT HOW TO GET UV INDEX
      //   currentUV.textContent = ``;
    }) //TODO: Get this to display for invalid responses!
    .catch(function (err) {
      console.log("ERROR");
    });

  //^MULTI FORCASTS
  fetch(forecast)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // LOOP THROUGH ARRAY AND SET VALUES FOR TEMP WIND AND HUMIDITY
      data.list.forEach(function (value, index) {
        temp[index].textContent = `Temp: ${value.main.temp}°F`;
        wind[index].textContent = `Wind:${value.wind.speed} MPH`;
        humidity[index].textContent = `Humidity: ${value.main.humidity} %`;
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};

//* EVENT LISTENERS
// When form hear submit event it will call the weatherData function
form.addEventListener("submit", weatherData);
