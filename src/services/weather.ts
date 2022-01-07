import Axios from "axios"

export interface WeatherData {
    latitude: number
    longitude: number
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

async function getCoordsByLocation() {
    const data = await new Promise<{ latitude: number; longitude: number }>(
        (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    })
                },
                (error) => {
                    reject(error)
                }
            )
        }
    )
    return data
}

async function getCoordsByAPI() {
    const res = await Axios.get("https://api.weatherapi.com/v1/ip.json", {
        params: {
            key: "578b20a3afde47d8b5b173725220701",
            q: "auto:ip",
        },
    })
    return { latitude: res.data.lat, longitude: res.data.lon }
}

export default async function WeatherService(): Promise<WeatherData> {
    let data: { latitude: number; longitude: number }
    if ("geolocation" in navigator) {
        try {
            data = await getCoordsByLocation()
        } catch (err) {
            data = await getCoordsByAPI()
        }
    } else {
        data = await getCoordsByAPI()
    }
    const latitude = data.latitude
    const longitude = data.longitude
    const apiKey = "9ec985f43b7fc537d4ab3d4953fb50ed"

    const res = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${apiKey}`
    )
    const weatherData: WeatherAPIResult = res.data
    const celsius = weatherData.main.temp
    const fahrenheit = Number((celsius * (9 / 5) + 32).toFixed(2))
    const location = weatherData.name
    const description = weatherData.weather[0].description
    const sunrise = weatherData.sys.sunrise
    const sunset = weatherData.sys.sunset
    const id = weatherData.weather[0].id

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
