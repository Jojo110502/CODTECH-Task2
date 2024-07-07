async function getWeather() {
    const apiKey = '54e547d3806f93f59b77d0751461e5be'; // Replace with your OpenWeatherMap API key
    const city = document.getElementById('city-input').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log('Fetching weather data for:', city);

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('API response:', data);

        if (data.cod === 200) {
            document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
            document.getElementById('weather-description').innerText = data.weather[0].description;
            document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;

            const weatherCondition = data.weather[0].main.toLowerCase();
            changeBackground(weatherCondition);
        } else {
            document.getElementById('city-name').innerText = 'City not found';
            document.getElementById('weather-description').innerText = '';
            document.getElementById('temperature').innerText = '';
            document.body.className = 'default'; // Reset to default background
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function changeBackground(condition) {
    console.log('Changing background to condition:', condition);
    switch(condition) {
        case 'clear':
            document.body.style.backgroundImage = "url('clear.webp')"; // Add a clear weather image
            break;
        case 'haze':
        case 'clouds':
            document.body.style.backgroundImage = "url('cloudy.avif')"; // Add a cloudy weather image
            break;
        case 'rain':
        case 'drizzle':
        case 'thunderstorm':
            document.body.style.backgroundImage = "url('rainy.jpg')"; // Add a rainy weather image
            break;
        case 'snow':
            document.body.style.backgroundImage = "url('snowy.jpg')"; // Add a snowy weather image
            break;
        default:
            document.body.style.backgroundImage = "url('default.jpg')"; // Add a default weather image
            break;
    }
}
