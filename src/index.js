import './style.css'
import './magnify.svg'

let weatherData
const key = '6CTDN5Z7DR4SGMELQYE6CH37R'

const updateDisplay = function updateDisplayDOM() {}

const getWeatherData = async function fetchWeatherDataObject() {
    try {
        const response = await fetch(
            'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/sandiego/?key=' +
                key,
            { mode: 'cors' }
        )
        if (response.status == 200) {
            weatherData = response
            processData()
        }
    } catch (err) {
        console.error(err)
    }
}

const processData = async function processJSONData() {
    const newData = await weatherData.json()
    console.log(newData)
}

getWeatherData()
