
const WeatherForm = document.querySelector(".WeatherForm");
const cityInput = document.querySelector('.cityinput');
const card = document.querySelector('.card');
const apiKey = "e849f884967c248dfa448e7d0af1b1d2"; // Renamed to apiKey for clarity

WeatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value;

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError("Could not fetch weather data");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Updated API URL
    const response = await fetch(apiURL);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json(); // Added await to parse JSON
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;

    // Clear previous content
    card.textContent = "";
    card.style.display = 'flex';

    // Create elements to display weather info
    const Cdisplay = document.createElement('h1');
    const Tdisplay = document.createElement('p');
    const Hdisplay = document.createElement('p');
    const Ddisplay = document.createElement('p');
    const Wemoji = document.createElement('p');

    // Set content for the elements
    Cdisplay.textContent = city;
    Tdisplay.textContent = `${temp}°C`;
    Hdisplay.textContent = `Humidity: ${humidity}%`;
    Ddisplay.textContent = description;
    Wemoji.textContent = getWeatherEmoji(id);

    // Add classes for styling
    Cdisplay.classList.add('Cdisplay');
    Tdisplay.classList.add('Tdisplay');
    Hdisplay.classList.add('Hdisplay');
    Ddisplay.classList.add('Ddisplay');
    Wemoji.classList.add('Wemoji');

    // Append elements to the card
    card.appendChild(Cdisplay);
    card.appendChild(Tdisplay);
    card.appendChild(Hdisplay);
    card.appendChild(Ddisplay);
    card.appendChild(Wemoji);
}

function getWeatherEmoji(weatherId) {
    // Return appropriate emoji based on weather condition
    if (weatherId >= 200 && weatherId < 300) {
        return '⛈️'; // Thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
        return '🌧️'; // Drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
        return '🌧️'; // Rain
    } else if (weatherId >= 600 && weatherId < 700) {
        return '❄️'; // Snow
    } else if (weatherId >= 700 && weatherId < 800) {
        return '🌫️'; // Atmosphere (e.g., fog, haze)
    } else if (weatherId === 800) {
        return '☀️'; // Clear
    } else if (weatherId > 800 && weatherId < 900) {
        return '☁️'; // Clouds
    } else {
        return '❓'; // Unknown
    }
}

function displayError(message) {
    // Clear previous content
    card.textContent = "";
    card.style.display = 'flex';

    // Create error message element
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    // Append error message to the card
    card.appendChild(errorDisplay);
}
