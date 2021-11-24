//todo: CHANGE TIME FORMAT FOR MOMENT.JS AND MAKE IT SO THAT I GET THE TIME FOR THE CITY NAME TYPED IN!
//todo: GET UV INDEX AND HAVE BACKGROUND CHANGE COLOUR
//~ Apparently, lon and lat is required for uv background`
//~ Use geolocation api
//todo: PERSIST SEARCH HISTORY TO LOCAL STORAGE
//todo: GET ICON FOR FORECAST
//todo: CHANGE BACKGROUND COLOUR OF SEARCH HISTORY BUTTONS, THEY'RE TOO DARK
//todo: CHANGE RESPONSIVENESS FOR CARDS
//todo: MAKE OPTION FOR CHOOSING CITIES BASED ON COUNTRIES SINCE SOME COUNTRIES HAVE CITIES WITH THE SAME NAME
//todo: MAKE IT SO THAT THERE ARE NO REPEATS IN SEARCH HISTORY

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

// Future Temp
const temp = document.querySelectorAll(".temp");
// Future Wind
const wind = document.querySelectorAll(".wind");
// Future Humidity
const humidity = document.querySelectorAll(".humidity");
// Future Dates
const dates = document.querySelectorAll(".date");

// Set date
currentDate.textContent = moment();

//* FUNCTIONS

// Function that gives weather info
const weatherData = function (e) {
  // Prevents site from re-loading upon form submit
  e.preventDefault();

  // Variable that stores value of what is submitted through the form
  const inputValue = input.value;

  // OneWeatherMap API URL with the city name typed and the api key
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial&current`;

  // Geolocation API
  const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue},&limit=1&appid=${apiKey}`;

  // Weather Forecast for more than one time stamp
  const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}&units=imperial&current&cnt=5`;

  // Lon and lat
  let lon;
  let lat;

  const oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}`;

  // Fetch weather data

  //^ FETCH LON AND LAT
  fetch(geoURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // lon = data[0].lon;
      // lat = data[0].lat;
      console.log(`Lon: ${data[0].lon} Lat: ${data[0].lat}`);
    })
    .catch(function (err) {
      console.log("err");
    });

  //^ CURRENT WEATHER
  fetch(weatherURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // console.log(data);
      // console.log(data.dt * 1000);
      // console.log(moment().add(24, "hours"));
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
      // TODO IT SEEMS I NEED LAT AND LON TO GET UV INDEX
      //   currentUV.textContent = ``;
    }) //TODO: Get this to display for invalid responses!
    .catch(function (err) {
      console.log("ERROR");
    });

  //^MULTI FORCASTS
  fetch(oneCall)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // LOOP THROUGH ARRAY AND SET VALUES FOR TEMP WIND AND HUMIDITY
      data.list.forEach(function (value, index) {
        //! It seems like you need to pay to get a daily forecast
        // dates[0].textContent = moment().add(24, `hours`);
        // dates[1].textContent = moment().add(48, `hours`);
        // dates[2].textContent = moment().add(72, `hours`);
        // dates[3].textContent = moment().add(96, `hours`);
        // dates[4].textContent = moment().add(120, `hours`);
        temp[index].textContent = `Temp: ${value.main.temp}°F`;
        wind[index].textContent = `Wind:${value.wind.speed}MPH`;
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
