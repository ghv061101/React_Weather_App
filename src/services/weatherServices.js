import { DateTime } from "luxon";

const API_KEY = '358da2a1ecc2d99405e15dc5f71bcba7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

// Function to fetch weather data from the API
const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({
        ...searchParams,
        appid: API_KEY,
    });

    return fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Fetched data:", data); // Log the fetched data
            return data;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error); // Catch and log any errors
        });
};

// Function to get icon URL from the weather icon code
const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

// Function to format the local time from UTC
const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => 
    DateTime.fromSeconds(secs + offset, { zone: 'utc' }).toFormat(format);

// Function to format current weather data
const formatCurrent = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed },
        timezone,
    } = data;

    const { main: details, icon } = weather[0];
    const formattedLocalTime = formatToLocalTime(dt, timezone);

    return {
        lat,
        lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, 'hh:mm a'),
        sunset: formatToLocalTime(sunset, timezone, 'hh:mm a'),
        details,
        icon: iconUrlFromCode(icon),
        speed,
        formattedLocalTime,
        timezone,
    };
};

// Function to format forecast weather data
const formatForecastWeather = (secs, offset, data) => {
    // Hourly forecast
    const hourly = data.filter((f) => f.dt > secs).map(f => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    })).slice(0, 5);

    // Daily forecast
    const daily = data.filter((f) => f.dt_txt.slice(-8) === "00:00:00").map(f => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, 'ccc'),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt,
    }));

    return { hourly, daily };
};

// Main function to get formatted weather data
const getFormattedWeatherData = async (searchParams) => {
    try {
        const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrent);
        const { dt, lat, lon, timezone } = formattedCurrentWeather;

        const formattedForecastWeather = await getWeatherData('forecast', { lat, lon, units: searchParams.units }).then((d) => formatForecastWeather(dt, timezone, d.list));

        return { ...formattedCurrentWeather, ...formattedForecastWeather };
    } catch (error) {
        console.error("Error getting formatted weather data:", error);
    }
}

export default getFormattedWeatherData;
