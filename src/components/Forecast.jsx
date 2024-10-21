import React from 'react';

const Forecast = () => {
    const forecastData = [
        { day: "Mon", icon: "01d", temp: 18 },
        { day: "Tue", icon: "02d", temp: 21 },
        { day: "Wed", icon: "03d", temp: 19 },
        { day: "Thu", icon: "04d", temp: 22 },
        { day: "Fri", icon: "01d", temp: 23 },
        { day: "Sat", icon: "03d", temp: 20 },
        { day: "Sun", icon: "02d", temp: 24 },
    ];

    return (
        <div>
            <div className='flex items-center justify-start mt-6'>
                <p className='font-medium uppercase'>7-day Forecast</p>
            </div>
            <hr className='my-1' />
            <div className='flex items-center justify-between'>
                {forecastData.map(({ day, icon, temp }, index) => (
                    <div key={index} className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm'>{day}</p>
                        <img 
                            src={`http://openweathermap.org/img/wn/${icon}@2x.png`} 
                            alt={`${day} weather icon`} 
                            className='w-12 my-1' 
                        />
                        <p className='font-medium'>{temp}°</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forecast;
