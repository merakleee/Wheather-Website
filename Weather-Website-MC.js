

const WeatherForm = document.querySelector(".WeatherForm");
const cityinput = document.querySelector('.cityinput');
const card = document.querySelector('.card');
const api = "e849f884967c248dfa448e7d0af1b1d2";

WeatherForm.addEventListener("submit", event =>{

    event.preventDefault();
    const city = cityinput.value;

    if(city){

    }
    else{
        DisplayError("Please enter a city");
    }

});

async function getWeatherData(city) {
    
}

function DisplayWeatherInfo(data){

}
function GetWeatherEmoji(weatherId){

}
function DisplayError(message){
    const errord = document.createElement('p');
    errord.textContent = message;
    errord.classList.add('errord');

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild = (DisplayError);

}

