
const WeatherForm = document.querySelector(".WeatherForm");
const cityInput = document.querySelector('.cityinput');
const card = document.querySelector('.card');
const apiKey = "e849f884967c248dfa448e7d0af1b1d2";

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
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiURL);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }
    return await response.json(); 
}

function displayWeatherInfo(data) {
    const { name: city, main: { temp, humidity }, weather: [{ description, id }] } = data;


    card.textContent = "";
    card.style.display = 'flex';


    const Cdisplay = document.createElement('h1');
    const Tdisplay = document.createElement('p');
    const Hdisplay = document.createElement('p');
    const Ddisplay = document.createElement('p');
    const Wemoji = document.createElement('p');


    Cdisplay.textContent = city;
    Tdisplay.textContent = `${temp}°C`;
    Hdisplay.textContent = `Humidity: ${humidity}%`;
    Ddisplay.textContent = description;
    Wemoji.textContent = getWeatherEmoji(id);


    Cdisplay.classList.add('Cdisplay');
    Tdisplay.classList.add('Tdisplay');
    Hdisplay.classList.add('Hdisplay');
    Ddisplay.classList.add('Ddisplay');
    Wemoji.classList.add('Wemoji');

    card.appendChild(Cdisplay);
    card.appendChild(Tdisplay);
    card.appendChild(Hdisplay);
    card.appendChild(Ddisplay);
    card.appendChild(Wemoji);
}

function getWeatherEmoji(weatherId) {

    if (weatherId >= 200 && weatherId < 300) {
        return '⛈️'; 
    } else if (weatherId >= 300 && weatherId < 400) {
        return '🌧️'; 
    } else if (weatherId >= 500 && weatherId < 600) {
        return '🌧️'; 
    } else if (weatherId >= 600 && weatherId < 700) {
        return '❄️'; 
    } else if (weatherId >= 700 && weatherId < 800) {
        return '🌫️'; 
    } else if (weatherId === 800) {
        return '☀️'; 
    } else if (weatherId > 800 && weatherId < 900) {
        return '☁️'; 
    } else {
        return '❓'; 
    }
}

function displayError(message) {
 
    card.textContent = "";
    card.style.display = 'flex';

 
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

  
    card.appendChild(errorDisplay);
}
