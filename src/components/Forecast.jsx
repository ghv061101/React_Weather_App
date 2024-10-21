// src/components/Forecast.jsx
import React, { useEffect, useState } from 'react';
import { fetchWeatherData } from '../services/weatherServices';
import Inputs from './Inputs';
import TempAndDetails from './TempAndDetails';
import TimeAndLocation from './TimeAndLocation';
import WeatherChart from '../WeatherChart';

const Forecast = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('Delhi'); // Default location
    const [temperatureThreshold, setTemperatureThreshold] = useState(() => {
        return localStorage.getItem('temperatureThreshold') || 35; // Default threshold
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        localStorage.setItem('temperatureThreshold', temperatureThreshold); // Store the threshold
    }, [temperatureThreshold]);

    const fetchWeather = async () => {
        try {
            const rawData = await fetchWeatherData(location);
            setWeatherData(rawData);
            setError(null);
        } catch (err) {
            setError('Failed to fetch weather data. Please try again.');
            setWeatherData(null);
        }
    };

    useEffect(() => {
        fetchWeather();
        const intervalId = setInterval(fetchWeather, 300000); // Fetch every 5 minutes
        return () => clearInterval(intervalId);
    }, [location]); // Depend on location to refetch when it changes

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Weather Monitoring System</h1>
            <Inputs
                location={location}
                setLocation={setLocation}
                fetchWeather={fetchWeather}
                temperatureThreshold={temperatureThreshold}
                setTemperatureThreshold={setTemperatureThreshold}
            />
            {error && <p className="text-red-500">{error}</p>}
            <TimeAndLocation weatherData={weatherData} />
            <TempAndDetails weatherData={weatherData} />
            <WeatherChart />
        </div>
    );
};

export default Forecast;
