document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('search');
    form.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission

        const cityInput = document.getElementById('cityInput').value;

        // Call function to fetch weather data for the entered city
        fetchWeatherData(cityInput);
    });
});

function fetchWeatherData(city) {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4e33b86b76msh8c6f53c5a2c0d55p151d0bjsna922a8c3b84c',
            'X-RapidAPI-Host': 'weather-api138.p.rapidapi.com'
        }
    };

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            // Extract weather information from the data object
            console.log(data);
            const cityName = city;
            const temperature = data.main.temp;
            const temperatureCelsius = convertKelvinToCelsius(temperature);
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;
            const sunrise = data.sys.sunrise * 1000; // Convert Unix timestamp to milliseconds
            const tempm=data.main.temp_max;
            const tempmc=convertKelvinToCelsius2(tempm);
            const tempp=data.main.temp_min;
            const temppc=convertKelvinToCelsius3(tempp);
            const sunset=data.sys.sunset * 1000;
            // Convert sunrise time to hours, minutes, and seconds

            const sunriseTime2 = new Date(sunset);
            const sunriseHours2 = sunriseTime2.getHours();
            const sunriseMinutes2 = sunriseTime2.getMinutes();
            const sunriseSeconds2 = sunriseTime2.getSeconds();

            const sunriseTime = new Date(sunrise);
            const sunriseHours = sunriseTime.getHours();
            const sunriseMinutes = sunriseTime.getMinutes();
            const sunriseSeconds = sunriseTime.getSeconds();

            // Update HTML elements with weather information
            document.querySelector('.city').innerHTML = `<strong>${cityName}</strong>`;
            document.querySelector('.temp').textContent = `Temperature: ${temperatureCelsius}°C`;
            document.querySelector('.wind').textContent = `Wind: ${windSpeed} km/h`;
            document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
            document.querySelector('.sunrise').textContent = `Sunrise: ${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`;
            document.querySelector('.max-temp').textContent = `Max Temp: ${tempmc}°C`;
            document.querySelector('.min-temp').textContent = `Min Temp: ${temppc}°C`;
            document.querySelector('.sunset').textContent = `Sunset: ${sunriseHours2}:${sunriseMinutes2}:${sunriseSeconds2}`;

            // Clear error message if present
            document.querySelector('.error-message').textContent = '';
        })
        .catch(error => {
            console.error('Error:', error);
            // Display error message on the screen
            document.querySelector('.error-message').textContent = 'Failed to fetch weather data';
        });
}

function convertKelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}

function convertKelvinToCelsius2(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}

function convertKelvinToCelsius3(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}