import React, { useEffect, useState } from 'react';
import TopButtons from './components/TopButtons';
import TimeAndLocation from './components/TimeAndLocation';
import TempAndDetails from './components/TempAndDetails';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import getFormattedWeatherData from './services/weatherServices'; // Import the weather data functions

const App = () => {
    const [query, setQuery] = useState({ q: 'palmaner' });
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);

    const getWeather = async () => {
        try {
            const data = await getFormattedWeatherData({ ...query, units });
            setWeather(data);
            console.log("Weather data set:", data); // Log the weather data set
        } catch (error) {
            console.error("Error getting weather:", error);
        }
    };

    useEffect(() => {
        getWeather();
    }, [query, units]);


    const formatBackground =()=>{
        if (!weather) return 'from-cyan-600 to-blue-700';
        const threshold = units === 'metric' ? 30 : units ? 86 : 297;
        if (weather.temp <= threshold) return 'from-cyan-600 to-blue-700';
        return "from-yellow-600 to-orange-700";
        
    }

    return (
        <div className={`mx-auto max-w-screen-lg mt-4 py-5 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}>
            <TopButtons setQuery={setQuery} setUnits={setUnits} />
            <Inputs setQuery={setQuery} setUnits={setUnits}/> {/* Pass down state setters as props */}

            {weather && (
                <>
                    <TimeAndLocation weather={weather} />
                    <TempAndDetails weather={weather} />
                    <Forecast title='3 hours step Forecast' data={weather.hourly}/>
                    <Forecast title='daily forecast' data={weather.daily} />
                </>
            )}
        </div>
    );
};

export default App;
