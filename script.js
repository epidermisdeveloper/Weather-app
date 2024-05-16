document.addEventListener('DOMContentLoaded', function () {
    const searchh = document.getElementById('content');
    let intro = document.querySelector('.intro');
    let logo = document.querySelector(".logo-header");
    let logoSpan = document.querySelectorAll('.logo');
    const weathericon = document.querySelector('.weather-icon');
    const details = document.querySelector('.details');
    const detailss = document.querySelector('.detailss'); // Fixed typo here
    const form = document.getElementById('search-btn');
    const btn = document.querySelector('.card');
    const input = document.getElementById("search-input");
    const body = document.querySelector('.body');
    const home = document.querySelector(".btn-searching");
    var div = document.querySelector(".boody");
    var crsr = document.querySelector(".cursor");

    let prevScrollpos = window.pageYOffset;

    

window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "0";
  } else {
    document.getElementById("header").style.top = "-70px"; // Adjust the height of your header accordingly
  }
  prevScrollpos = currentScrollPos;
}


    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    const colors = [
        "#ffffff"
    ];

    circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;

    });

    function animateCircles() {

        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + "px";
            circle.style.top = y - 12 + "px";

            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();

    const expand = () => {
        btn.classList.toggle("close");
        input.classList.toggle("square");
    };

    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => { // Fixed typo here
                setTimeout(() => {
                    span.classList.remove('active');
                    span.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            navbar.style.display = 'flex';
            intro.style.top = '-100vh';
        }, 2300);
    }, 100); // Added delay to match the intro fadeout timing

    const navbar = document.getElementById('navbar');


    form.addEventListener('click', function (event) {
        expand();
        weathericon.style.display = 'block';
        event.preventDefault(); // Prevent form submission
    });

    input.addEventListener('keypress', function (event) {
        if (event.key === "Enter") {
            searchh.style.display = 'none';
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
                    searchh.style.display = 'none';
                    preloader.style.display = 'none';
                    btn.style.display = 'block';
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

    home.addEventListener('click', function (event) {
        btn.style.display = "none";
        searchh.style.display = "flex";
        input.value = "";
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
            const feels = data.main.feels_like;
            const temppc = convertKelvinToCelsius3(feels);
            const weatherdescription = data.weather[0].main;

            if (weatherdescription === "Clouds") {
                icon.src = "images/clouds.png";
            } else if (weatherdescription === "Rain") {
                icon.src = "images/rain.png";
            } else if (weatherdescription === "Clear") {
                icon.src = "images/clear.png";
            } else if (weatherdescription === "Drizzle") {
                icon.src = "images/drizzle.png";
            } else if (weatherdescription === "Haze") {
                icon.src = "images/mist.png";
            }

            console.log(data);

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
            document.querySelector('.min-temp').textContent = `Feels: ${temppc}°C`;
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
    return Math.round(kelvin - 273.15);
}

function convertKelvinToCelsius2(kelvin) {
    return Math.round(kelvin - 273.15);
}

function convertKelvinToCelsius3(kelvin) {
    return Math.round(kelvin - 273.15);
}
