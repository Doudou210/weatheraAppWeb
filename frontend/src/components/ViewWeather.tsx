import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ViewWeather () {
    const location = useLocation();
    const weatherData = location.state;

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Weather Forecast for {weatherData.location.name}</h2>
            {weatherData.forecast.forecastday.map((day: any) => (
                <div key={day.date} style={{ marginBottom: '20px' }}>
                    <h3>{day.date}</h3>
                    <p>Sunrise: {day.astro.sunrise}</p>
                    <p>Moon Phase: {day.astro.moon_phase}</p>
                    <p>Condition: {day.day.condition.text}</p>
                    <p>Max Temp: {day.day.maxtemp_c}°C</p>
                    <p>Min Temp: {day.day.mintemp_c}°C</p>
                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                </div>
            ))}
        </div>
    );
};
