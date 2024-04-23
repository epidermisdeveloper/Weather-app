document.addEventListener('DOMContentLoaded', function () {
    const searchh = document.getElementById('content');
    const intro = document.querySelector('.intro');
    const weathericon = document.querySelector('.weather-icon');
    const details = document.querySelector('.details');
    const form = document.getElementById('search-btn');
    const btn = document.querySelector('.card');
    const input = document.getElementById("search-input");
    const body = document.querySelector('.body');
    
    intro.style.display = 'flex';

    const expand = () => {
        btn.classList.toggle("close");
        input.classList.toggle("square");
    };

    // Fade in intro
    intro.style.opacity = '0';
    searchh.style.display = 'none';
    setTimeout(() => {
        intro.style.opacity = '1';
    }, 10);

    // Fade out intro after 3 seconds
    setTimeout(() => {
        intro.style.opacity = '0';
        setTimeout(() => {
            intro.style.display = 'none';
            searchh.style.display = 'inline-block';
            searchh.style.width = '30%';
        }, 1000); // After the opacity transition is complete
    }, 3000);

    form.addEventListener('click', function(event) {
        expand();
        weathericon.style.display = 'block';
        event.preventDefault(); // Prevent form submission
    });

    input.addEventListener('keypress', function(event) {
        expand();
        if(event.key === "Enter"){
            searchh.style.display= 'none';
            const cityInput = input.value; // Use input directly
            const preloader = document.querySelector('.preloader');
            preloader.style.display = 'flex';

            // Fade in preloader
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.opacity = '1';
            }, 10);

            // Fade out preloader after 3 seconds
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    searchh.style.display= 'none';
                    preloader.style.display = 'none';
                    document.querySelector('.card').style.display = 'block';
                    details.style.display = 'flex';
                    detailss.style.display = 'flex';
                    // Display weather details
                }, 1000); // After the opacity transition is complete
            }, 3000);

            // Call function to fetch weather data for the entered city
            fetchWeatherData(cityInput);
            event.preventDefault(); // Prevent form submission
        }
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
            const icon = document.querySelector('.weather-icon');
            const cityName = city;
            const temperature = data.main.temp;
            const temperatureCelsius = convertKelvinToCelsius(temperature);
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;
            const sunrise = data.sys.sunrise * 1000; // Convert Unix timestamp to milliseconds
            const sunset = data.sys.sunset * 1000;
            const tempm = data.main.temp_max;
            const tempmc = convertKelvinToCelsius2(tempm);
            const tempp = data.main.temp_min;
            const temppc = convertKelvinToCelsius3(tempp);
            const weatherdescription = data.weather[0].main;

            if(weatherdescription === "Clouds"){
                icon.src = "images/clouds.png";
            } else if(weatherdescription === "Rain"){
                icon.src = "images/rain.png";
            } else if(weatherdescription === "Clear"){
                icon.src = "images/clear.png";
            } else if(weatherdescription === "Drizzle"){
                icon.src = "images/drizzle.png";
            } else if(weatherdescription === "Mist"){
                icon.src = "images/mist.png";
            }

            // Convert sunrise time to hours, minutes, and seconds
            const sunriseTime = new Date(sunrise);
            const sunriseHours = sunriseTime.getHours();
            const sunriseMinutes = sunriseTime.getMinutes();
            const sunriseSeconds = sunriseTime.getSeconds();

            // Convert sunset time to hours, minutes, and seconds
            const sunsetTime = new Date(sunset);
            const sunsetHours = sunsetTime.getHours();
            const sunsetMinutes = sunsetTime.getMinutes();
            const sunsetSeconds = sunsetTime.getSeconds();

            // Update HTML elements with weather information
            document.querySelector('.city').innerHTML = `<strong>${cityName}</strong>`;
            document.querySelector('.temp').textContent = `Temperature: ${temperatureCelsius}°C`;
            document.querySelector('.wind').textContent = `Wind: ${windSpeed} km/h`;
            document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
            document.querySelector('.sunrise').textContent = `Sunrise: ${sunriseHours}:${sunriseMinutes}:${sunriseSeconds}`;
            document.querySelector('.max-temp').textContent = `Max Temp: ${tempmc}°C`;
            document.querySelector('.min-temp').textContent = `Min Temp: ${temppc}°C`;
            document.querySelector('.sunset').textContent = `Sunset: ${sunsetHours}:${sunsetMinutes}:${sunsetSeconds}`;

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
