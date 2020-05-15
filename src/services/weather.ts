import Axios from "axios"

export interface WeatherData {
    latitude: string
    longitude: string
    celsius: number
    fahrenheit: number
    location: string
    description: string
    sunrise: number
    sunset: number
    id: number
}

interface WeatherAPIResult {
    name: string
    main: {
        temp: number
    }
    sys: {
        sunrise: number
        sunset: number
    }
    weather: [
        {
            description: string
            id: number
        }
    ]
}

export default async function WeatherService(): Promise<WeatherData> {
    const apiKey = "9ec985f43b7fc537d4ab3d4953fb50ed"

    let res = await Axios.get("https://www.geoip-db.com/json/")
    const latitude = res.data.latitude
    const longitude = res.data.longitude
    res = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`
    )
    const data: WeatherAPIResult = res.data
    const celsius = data.main.temp
    const fahrenheit = Number((celsius * (9 / 5) + 32).toFixed(2))
    const location = data.name
    const description = data.weather[0].description
    const sunrise = data.sys.sunrise
    const sunset = data.sys.sunset
    const id = data.weather[0].id

    return {
        latitude,
        longitude,
        celsius,
        fahrenheit,
        location,
        description,
        sunrise,
        sunset,
        id,
    }
}
