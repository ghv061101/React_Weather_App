import { DateTime } from "luxon";

const API_KEY = '358da2a1ecc2d99405e15dc5f71bcba7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({
        ...searchParams,
        appid: API_KEY,
        units: 'metric'  // Default units set to metric
    });

    return fetch(url).then((res) => res.json());
};

const iconUrlFromCode = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") => 
    DateTime.fromSeconds(secs).setZone(offset).toFormat(format);

const formatCurrentWeather = (data) => {
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
    const formatedLocalTime = formatToLocalTime(dt, timezone);

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
        formatedLocalTime,
        timezone,
    };
};

const formatForecastWeather = (secs, offset, data) => {
    const daily = data.daily.map((f) => ({
        day: formatToLocalTime(f.dt, offset, 'cccc'),
        temp: f.temp.day,
        icon: iconUrlFromCode(f.weather[0].icon),
        humidity: f.humidity,
        wind_speed: f.wind_speed,
        weather: f.weather[0].description,
    }));

    const hourly = data.hourly.filter((f) => f.dt > secs).slice(0, 5).map(f => ({
        temp: f.temp,
        title: formatToLocalTime(f.dt, offset, 'hh:mm a'),
        icon: iconUrlFromCode(f.weather[0].icon),
    }));

    return { daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
    const currentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather);
    const { dt, lat, lon, timezone } = currentWeather;   
    const forecastData = await getWeatherData('onecall', { lat, lon, exclude: 'minutely', units: 'metric' });
    const { daily, hourly } = formatForecastWeather(dt, timezone, forecastData);

    return { ...currentWeather, daily, hourly };
};

export default getFormattedWeatherData;
