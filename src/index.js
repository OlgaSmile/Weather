// ⏰Feature #1
// In your project, display the current date and time using JavaScript: Tuesday 16:00
const currentDayEl = document.querySelector("#current-day");
const currentTimeEl = document.querySelector("#current-time");
const currentDateEl = document.querySelector("#current-date");

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

// 🕵️‍♀️Feature #2
// Add a search engine: a search bar with a button. When searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

const searchFormEl = document.querySelector("#search-form");

function onSearchFormSubmit(e) {
  e.preventDefault();
  const currentCityName = document.querySelector("#city-name");
  const currentCityEl = document.querySelector("#current-city");
  currentCityEl.innerHTML = currentCityName.value;
}

searchFormEl.addEventListener("submit", onSearchFormSubmit);
// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

const celsiusEl = document.querySelector("#celsius");
const fahrenheitEl = document.querySelector("#fahrenheit");
const currentTempEl = document.querySelector("#current-temp");
let temperature = 22;

function changeInCelsius(e) {
  currentTempEl.innerHTML = temperature;
}

function changeInFahrenheit(e) {
  currentTempEl.innerHTML = `${(temperature * 9) / 5 + 32}`;
}

celsiusEl.addEventListener("click", changeInCelsius);
fahrenheitEl.addEventListener("click", changeInFahrenheit);
