const apiKey = "5863935ee9cca4c02ed68203f807c65b";

const currentCityName = document.querySelector("#city-name");
const currentCityEl = document.querySelector("#current-city");
const celsiusEl = document.querySelector("#celsius");
const fahrenheitEl = document.querySelector("#fahrenheit");
const currentTempEl = document.querySelector("#current-temp");
const minTempEl = document.querySelector("#min-temp");
const maxTempEl = document.querySelector("#max-temp");
const currentDayEl = document.querySelector("#current-day");
const currentTimeEl = document.querySelector("#current-time");
const currentDateEl = document.querySelector("#current-date");

// Search temperature by city name
function getTemp(res) {
  currentTempEl.innerHTML = Math.round(res.data.main.temp);
  minTempEl.innerHTML = Math.round(res.data.main.temp_min);
  maxTempEl.innerHTML = Math.round(res.data.main.temp_max);
}

function searchTemperature(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getTemp);
}

//Current location
const currentLocationBtn = document.getElementById("current-location");
currentLocationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(getPosition);
});

function getCurrentCityName(res) {
  currentCityEl.innerHTML = res.data[0].name;
}

async function getPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const cityUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  await axios.get(cityUrl).then(getCurrentCityName);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  await axios.get(apiUrl).then(getTemp);
}

//  the current date and time

const date = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function addZero(num) {
  if (num < 10) {
    return ("0" + num).slice(-2);
  } else {
    return num;
  }
}

currentDayEl.innerHTML = days[date.getDay()].toUpperCase();
currentTimeEl.innerHTML = `${addZero(date.getHours())}:${addZero(
  date.getMinutes()
)}`;
currentDateEl.innerHTML = `${addZero(date.getDate())}.${addZero(
  date.getMonth() + 1
)}.${date.getFullYear()}`;

// A search engine: a search bar with a button. When searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

const searchFormEl = document.querySelector("#search-form");

function onSearchFormSubmit(e) {
  e.preventDefault();
  if (currentCityName.value.length === 0) {
    alert("Please, enter your city");
    return;
  }
  currentCityEl.innerHTML = currentCityName.value;
  searchTemperature(currentCityName.value);
}

searchFormEl.addEventListener("submit", onSearchFormSubmit);

let searchingTemp = 0;
let minTemperature = 0;
let maxTemperature = 0;

minTempEl.innerHTML = minTemperature;
maxTempEl.innerHTML = maxTemperature;

function changeInCelsius(e) {
  currentTempEl.innerHTML = searchingTemp;
  minTempEl.innerHTML = minTemperature;
  maxTempEl.innerHTML = maxTemperature;
}

function changeInFahrenheit(e) {
  currentTempEl.innerHTML = Math.round(`${(searchingTemp * 9) / 5 + 32}`);
  minTempEl.innerHTML = Math.round(`${(minTemperature * 9) / 5 + 32}`);
  maxTempEl.innerHTML = Math.round(`${(maxTemperature * 9) / 5 + 32}`);
}

celsiusEl.addEventListener("click", changeInCelsius);
fahrenheitEl.addEventListener("click", changeInFahrenheit);
