import React, { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import getFormattedWeatherData from './services/weatherServices'; // Import the weather data functions

const App = () => {
    const [query, setQuery] = useState({ q: 'Chittoor' });
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        try {
            const data = await getFormattedWeatherData({ q: query.q, units });
            setWeather(data);
            console.log("Weather data set:", data); // Log the weather data set
        } catch (error) {
            console.error("Error getting weather:", error);
        }
    };

    useEffect(() => {
        getWeather();
    }, [query, units]);

    return (
        <div className='mx-auto max-w-screen-lg mt-4 py-5 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-600 to-blue-700'>
            <TopButtons />
            <Inputs setQuery={setQuery} setUnits={setUnits} /> {/* Pass down state setters as props */}

            {weather && (
                <>
                    <TimeAndLocation weather={weather} />
                    <TempAndDetails weather={weather} />
                    <Forecast />
                    <Forecast />
                </>
            )}
        </div>
    );
};

export default App;
