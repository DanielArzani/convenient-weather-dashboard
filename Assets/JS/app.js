//* VARIABLES
//^ Search
// Form
const form = document.querySelector("form");
// Form Input
const input = document.querySelector('input[type="text"]');
// Search Button
const searchBtn = document.querySelector("#search-btn");
// API Key
const apiKey = "39e9d7b8c29775b4c2b37ed1510b744a";
// Search History
const searchHistoryBtn = document.querySelector("#search-history");

//^ Current Weather
// Current Date
const currentDate = document.querySelector("#current-date");
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

//^ Future Weather
// Weather Icon
const weatherIcon = document.querySelectorAll(".weather-icon");
// Future Temp
const temp = document.querySelectorAll(".temp");
// Future Wind
const wind = document.querySelectorAll(".wind");
// Future Humidity
const humidity = document.querySelectorAll(".humidity");
// Future Dates
const dates = document.querySelectorAll(".date");

//^ Other
// Sets current date and time until city is picked, then format is changed to match mock up
currentDate.textContent = moment().format("llll");

// Lon and lat
let lon;
let lat;

//^ Storage
// Checking if storage is empty and if it is get an empty array, if not get what ever is in there
let searchHistory = JSON.parse(localStorage.getItem("search-list")) || [];

//* FUNCTIONS

//& CURRENT WEATHER
function weatherData(cityname) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=imperial&current`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // Invalid response
      if (data.cod === "404") {
        alert("city not found");
        return;
      }

      displayWeather(data);

      // Get lat and lon to be able to get uv index
      let lat = data.coord.lat;
      let lon = data.coord.lon;
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`
      )
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          // Sets UV Index
          currentUV.textContent = data.current.uvi;

          // Changes UV Colour
          if (currentUV.textContent <= 2) {
            currentUV.classList.add("favourable");
          } else if (currentUV.textContent >= 5) {
            currentUV.classList.add("severe");
          } else {
            currentUV.classList.add("moderate");
          }
        });
    });

  // Displays the values in the current weather section (except for uv)
  function displayWeather(currentWeather) {
    // Gets the date and displays it
    const thisDate = new Date(currentWeather.dt * 1000);
    const day = thisDate.getDate();
    const month = thisDate.getMonth() + 1;
    const year = thisDate.getFullYear();
    currentDate.textContent = `(${month}/${day}/${year})`;
    // Displays city name
    currentLocation.textContent = currentWeather.name;
    // Temp
    currentTemp.textContent = `Temp: ${currentWeather.main.temp}°F`;
    // Wind Speed
    currentWind.textContent = `Wind: ${currentWeather.wind.speed} MPH`;
    // Humidity
    currentHumidity.textContent = `Humidity: ${currentWeather.main.humidity} %`;
  }
}
//& END OF CURRENT WEATHER

//& MULTI-DAY WEATHER FORECAST
// Gets the 5 day forecast
function multiForecast(cityname) {
  // Within the data there are 40 timestamps 3 hours apart each, you can pick the days you want from the array
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apiKey}&units=imperial`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // Calls function that displays the weather values
      forecastDisplay(data);
    });

  // Will display the values and icons for all 5 days
  // Given is a long array and only few of those array items are required so there won't be a loop
  function forecastDisplay(forecast) {
    console.log(forecast);
    // forecast.list[index].weather[0].icon
    //^ DAY 1
    // Setting the date
    const day1Date = new Date(forecast.list[7].dt * 1000);
    var forecastDay = day1Date.getDate();
    var forecastMonth = day1Date.getMonth() + 1;
    var forecastYear = day1Date.getFullYear();
    dates[0].textContent = `${forecastMonth}/${forecastDay}/${forecastYear}`;
    // Setting the icon
    let weatherPic1 = forecast.list[4].weather[0].icon;
    weatherIcon[0].setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic1 + "@2x.png"
    );
    // Setting the temp
    temp[0].textContent = `Temp: ${forecast.list[7].main.temp}°F`;
    // Setting the wind
    wind[0].textContent = `Wind: ${forecast.list[7].wind.speed}MPH`;
    // Setting the humidity
    humidity[0].textContent = `Humidity: ${forecast.list[7].main.humidity} %`;
    //^ DAY 2
    // Setting the date
    const day2Date = new Date(forecast.list[15].dt * 1000);
    var forecastDay2 = day2Date.getDate();
    var forecastMonth2 = day2Date.getMonth() + 1;
    var forecastYear2 = day2Date.getFullYear();
    dates[1].textContent = `${forecastMonth2}/${forecastDay2}/${forecastYear2}`;
    // Setting the icon
    let weatherPic2 = forecast.list[15].weather[0].icon;
    weatherIcon[1].setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic2 + "@2x.png"
    );
    // Setting the temp
    temp[1].textContent = `Temp: ${forecast.list[15].main.temp}°F`;
    // Setting the wind
    wind[1].textContent = `Wind: ${forecast.list[15].wind.speed}MPH`;
    // Setting the humidity
    humidity[1].textContent = `Humidity: ${forecast.list[15].main.humidity} %`;
    //^ DAY 3
    // Setting the date
    const day3Date = new Date(forecast.list[23].dt * 1000);
    var forecastDay3 = day3Date.getDate();
    var forecastMonth3 = day3Date.getMonth() + 1;
    var forecastYear3 = day3Date.getFullYear();
    dates[2].textContent = `${forecastMonth3}/${forecastDay3}/${forecastYear3}`;
    // Setting the icon
    let weatherPic3 = forecast.list[23].weather[0].icon;
    weatherIcon[2].setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic3 + "@2x.png"
    );
    // Setting the temp
    temp[2].textContent = `Temp: ${forecast.list[23].main.temp}°F`;
    // Setting the wind
    wind[2].textContent = `Wind: ${forecast.list[23].wind.speed}MPH`;
    // Setting the humidity
    humidity[2].textContent = `Humidity: ${forecast.list[23].main.humidity} %`;
    //^ DAY 4
    // Setting the date
    const day4Date = new Date(forecast.list[31].dt * 1000);
    var forecastDay4 = day4Date.getDate();
    var forecastMonth4 = day4Date.getMonth() + 1;
    var forecastYear4 = day4Date.getFullYear();
    dates[3].textContent = `${forecastMonth4}/${forecastDay4}/${forecastYear4}`;
    // Setting the icon
    let weatherPic4 = forecast.list[31].weather[0].icon;
    weatherIcon[3].setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic4 + "@2x.png"
    );
    // Setting the temp
    temp[3].textContent = `Temp: ${forecast.list[31].main.temp}°F`;
    // Setting the wind
    wind[3].textContent = `Wind: ${forecast.list[31].wind.speed}MPH`;
    // Setting the humidity
    humidity[3].textContent = `Humidity: ${forecast.list[31].main.humidity} %`;
    //^ DAY 5
    // Setting the date
    const day5Date = new Date(forecast.list[39].dt * 1000);
    var forecastDay5 = day5Date.getDate();
    var forecastMonth5 = day5Date.getMonth() + 1;
    var forecastYear5 = day5Date.getFullYear();
    dates[4].textContent = `${forecastMonth5}/${forecastDay5}/${forecastYear5}`;
    //* Setting the icon
    let weatherPic5 = forecast.list[39].weather[0].icon;
    weatherIcon[4].setAttribute(
      "src",
      "https://openweathermap.org/img/wn/" + weatherPic5 + "@2x.png"
    );
    // Setting the temp
    temp[4].textContent = `Temp: ${forecast.list[39].main.temp}°F`;
    // Setting the wind
    wind[4].textContent = `Wind: ${forecast.list[39].wind.speed}MPH`;
    // Setting the humidity
    humidity[4].textContent = `Humidity: ${forecast.list[39].main.humidity} %`;
  }
}
//& END OF MULTI FORECAST

// Create Search History Buttons
function createSearchBtns(name) {
  // Limits the amount of search history buttons to 6
  if (searchHistory.length <= 9) {
    // Creates the history buttons and adds classes and their textContent
    const span = document.createElement("span");
    span.classList.add(
      "city-name",
      "py-1",
      "my-2",
      "w-100",
      "btn",
      "bg-secondary",
      "history"
    );
    span.textContent = name;
    // Appends city name to search history button div
    searchHistoryBtn.append(span);
  } else {
    // Resets storage and search history div
    localStorage.clear();
    searchHistory = JSON.parse(localStorage.getItem("search-list")) || [];
    searchHistoryBtn.innerHTML = ``;
  }
}

// Fetches weather data using search history
function search(e) {
  // When button is clicked, its text (the city name) is acquired
  target = e.target.textContent;
  // Calls functions that fetch the weather data and display it
  weatherData(target);
  multiForecast(target);
}

// When a search history button is clicked on it will fetch the corresponding weather data and display it
searchHistoryBtn.addEventListener("click", search);

// Makes it so that the search history is rendered even if the page is refreshed
searchHistory.forEach(function (element) {
  createSearchBtns(element);
});

//*EVENT LISTENERS

// When form hear submit event it will call the weatherData function
form.addEventListener("submit", function (e) {
  // Prevents page from re-loading
  e.preventDefault();
  // Variable that stores value of what is submitted through the form
  let inputValue = input.value;
  // Call current weather function
  weatherData(inputValue);
  // Call several weather forecasts
  multiForecast(inputValue);
  // Add input into local storage
  searchHistory.push(inputValue);
  localStorage.setItem("search-list", JSON.stringify(searchHistory));
  // Call function that adds search history buttons
  createSearchBtns(inputValue);
  // Resets the form, specifically the value in the input field
  form.reset();
});
