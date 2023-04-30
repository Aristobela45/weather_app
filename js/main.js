const form = document.querySelector('#weatherInfoForm')
console.log(form)
// each ID class must have a # sign in front of the string
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    let searchWeather = document.querySelector('#searchWeather').value

    if (searchWeather.trim() !== '') {
        console.log(searchWeather)
        const weatherAppData = await getData(searchWeather)
        console.log(weatherAppData)
        // console.log(weatherAppData.main)
        // List was changed due to what only can retreive from the weather data
        createList(searchWeather, weatherAppData.name, weatherAppData.main.temp_max, weatherAppData.main.temp_min, weatherAppData.main.humidity)
    }
});
// creating a function of weather app data
const getData = async (searchWeather) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchWeather},us&APPID=8eceb6fe0d3552fbcb593ecac9921e28`);
    return response.data
}
// create a constant to hold dom elements
const DOM_Elements = {
    weather_list: '.weatherList'
}
// weather app data shows zipCode/city name/max temp/min temp/humidity
const createList = (zipCode, city, maxTemp, minTemp, humidity) => {
    console.log(zipCode, city, maxTemp, minTemp, humidity)
    const html = `
        <div class="card bg-light" style="width: 20rem">
                <h2 style="text-align:center" class="card-title">${zipCode}</h2>
                <h2 style="text-align:center" class="card-title">${city}</h2>
            <ul style="text-align:left" class="list-group list-group-flush">
                <li class="list-group-item">Maximum Temperature: ${maxTemp}°F</li>
                <li class="list-group-item">Minimum Temperature: ${minTemp}°F</li>
                <li class="list-group-item">humidity: ${humidity}</li> 
            </ul>
        </div>`;
    document.querySelector(DOM_Elements.weather_list).insertAdjacentHTML('beforeend', html)
    document.querySelector('#searchWeather').value = '';

};

const button = document.querySelector('button');

// button.addEventListener('click', () => {
//     document.querySelector(DOM_Elements.weather_list).innerHTML = '';
//     document.querySelector('searchWeather').value = '';
// });