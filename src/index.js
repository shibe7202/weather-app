import './style.css'
import './magnify.svg'
import partlyCloudy from './weather-partly-cloudy.svg'
import cloudy from './weather-cloudy.svg'
import clear from './weather-sunny.svg'

const key = '6CTDN5Z7DR4SGMELQYE6CH37R'

const getWeatherData = async function fetchWeatherDataObject(location) {
    try {
        const response = await fetch(
            'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' +
                location +
                '/?key=' +
                key,
            { mode: 'cors' }
        )
        return response
    } catch (err) {
        console.error(err)
    }
}

const processData = async function processJSONData(response) {
    const weatherData = await response.json()
    return weatherData
}

const updateDisplay = function updateDisplayDOM(weatherData) {
    const oldData = document.querySelectorAll('.weather > *')
    oldData.forEach(function (node) {
        node.innerHTML = ''
    })

    const headerDiv = document.querySelector('.header')
    const header = document.createElement('h1')
    header.textContent = 'Weather for ' + weatherData.resolvedAddress
    headerDiv.appendChild(header)

    const temperatureDiv = document.querySelector('.temperature')
    const temp = document.createElement('p')
    temp.textContent = weatherData.currentConditions.temp
    const tempTitle = document.createElement('p')
    tempTitle.textContent = 'Temperature'
    temperatureDiv.appendChild(tempTitle)
    temperatureDiv.appendChild(temp)

    const conditionsDiv = document.querySelector('.conditions')
    const conditions = document.createElement('p')
    conditions.textContent = weatherData.currentConditions.conditions
    const conditionsTitle = document.createElement('p')
    conditionsTitle.textContent = 'Conditions'
    conditionsDiv.appendChild(conditionsTitle)
    conditionsDiv.appendChild(conditions)

    const humidityDiv = document.querySelector('.humidity')
    const humidity = document.createElement('p')
    humidity.textContent = weatherData.currentConditions.humidity
    const humidityTitle = document.createElement('p')
    humidityTitle.textContent = 'Humidity'
    humidityDiv.appendChild(humidityTitle)
    humidityDiv.appendChild(humidity)

    const sunsetDiv = document.querySelector('.sunset')
    const sunset = document.createElement('p')
    sunset.textContent = weatherData.currentConditions.sunset
    const sunsetTitle = document.createElement('p')
    sunsetTitle.textContent = 'Sunset'
    sunsetDiv.appendChild(sunsetTitle)
    sunsetDiv.appendChild(sunset)

    placeIcon(weatherData)
}

const placeIcon = function selectWeatherIcon(weatherData) {
    const conditions = weatherData.currentConditions.conditions
    const iconDiv = document.querySelector('.conditions-icon')
    const img = new Image()
    img.classList.add('conditions-img')

    if (conditions == 'Partially cloudy') {
        img.src = partlyCloudy
        img.classList.add('partly-cloudy')
    } else if (conditions == 'Overcast') {
        img.src = cloudy
        img.classList.add('cloudy')
    } else if (conditions == 'Clear') {
        img.src = clear
        img.classList.add('clear')
    }

    iconDiv.appendChild(img)
}

const search = document.querySelector('#search-button')
const input = document.querySelector('#search-input')
search.addEventListener('click', async () => {
    const response = await getWeatherData(input.value)
    if (response.status == 200) {
        const weatherData = await processData(response)
        updateDisplay(weatherData)
    }
})
