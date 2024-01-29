// Set up variables
const apiKey = "a79c2f946e96792d64038a1a38f2d3a9";
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const divError = document.querySelector(".error");
const cityDisplay = document.getElementById("city");
const tempDisplay = document.getElementById("degree");
const weatherDisplay = document.getElementById("weather");
const weatherDesc = document.getElementById("detailed");
const weatherImg = document.getElementById("weather-img");

// All functions are called here
weatherForm.addEventListener("submit", async (event) => {
  // to prevent browser refresh when a form being submitted
  event.preventDefault();

  // to take the user input in the input text element
  const city = cityInput.value;

  // check if there any words being submitted or not && if there is a false city names or doesnt exit in the data
  if (city) {
    divError.innerHTML = "";
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      errorMessage(error);
    }
  } else {
    errorMessage("Please enter a city..");
  }
});

// Display an error message regarding false city name
function errorMessage(message) {
  divError.innerHTML = "";

  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("text-red-900", "text-center", "font-semibold");

  divError.appendChild(errorDisplay);
}

// fetch data api from openweather
async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const response = await fetch(apiUrl);
  console.log(response);

  if (!response.ok) {
    throw new Error("Could not fetch weather data");
  }

  return await response.json();
}

// display the data from getweatherData so that user can is it via HTML, and CSS
function displayWeatherInfo(data) {
  console.log(data);

  const {
    name: city,
    main: { temp },
    weather: [{ description, id, main }],
  } = data;

  const celcius = parseFloat((temp - 273.15).toFixed(1));
  console.log(id);

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${celcius}°`;
  weatherDisplay.textContent = main;
  weatherDesc.textContent = description;
  weatherImg.textContent = "";
  weatherImg.textContent = displayWeatherImage(id);
  console.log(weatherImg.textContent);
}

// To display the image weather icon by checking the ids of the weather in the openweather website
function displayWeatherImage(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return "⛈";
    case weatherId >= 300 && weatherId < 500:
      return "☔";
    case weatherId >= 500 && weatherId < 600:
      return "🌧";
    case weatherId >= 600 && weatherId < 700:
      return "🌨";
    case weatherId >= 700 && weatherId < 800:
      return "🌫";
    case weatherId === 800:
    case weatherId === 801:
    case weatherId === 802:
    case weatherId === 803:
    case weatherId === 804:
      return "🌥";
    default:
      console.log("Unexpected weatherId:", weatherId);
      return "❓";
  }
}
