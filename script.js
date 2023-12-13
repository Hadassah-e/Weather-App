const apiKey = "eb0cb51a800d459d9aa192324231112"; 
const baseUrl = "https://api.weatherapi.com/v1/current.json";

const searchInput = document.querySelector(".search");
const btn = document.querySelector(".btn");
const errorElement = document.querySelector(".error");
const cityElement = document.querySelector(".city");
const dateElement = document.querySelector(".date");
const tempElement = document.querySelector(".temp");
const weatherElement = document.querySelector(".weather");

btn.addEventListener("click", getInput);

function getInput(event) {
    event.preventDefault();
    if (event.type == "click") {
        const city = searchInput.value;
        if (city.trim() !== "") {
            getData(city);
            console.log(city);
        } else {
            displayError("Please enter a city!");
        }
    }
}

function getData(city) {
    fetch(`${baseUrl}?key=${apiKey}&q=${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(displayData)
        .catch(error => {
            displayError("Error fetching weather data. Please try again.");
        });
}

function displayData(response) {
    if (response.error) {
        displayError("Please enter a valid city!");
    } else {
        displayError(""); // To clear previous error messages

        cityElement.textContent = `${response.location.name}, ${response.location.country}`;
        dateElement.textContent = dateFunction(new Date());
        tempElement.innerHTML = `Temp: ${response.current.temp_c} <span>°C</span>`;
        weatherElement.textContent = `Weather: ${response.current.condition.text}`;
    }
}

function dateFunction(d) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
}

function displayError(message) {
    errorElement.textContent = message;
}
