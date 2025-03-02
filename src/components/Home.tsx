import React, { useEffect, useState } from 'react';
import Header from './header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SpeedInsights } from "@vercel/speed-insights/react";
import "../assets/css/Home.css"

interface WeatherData {
    location: {
        name: string;
    };
    forecast: {
        forecastday: {
            date: string;
            astro:{
                sunrise:string;
                moon_phase:string
            };
            day: {
                condition: {
                    text: string;
                    icon: string;
                };
                maxtemp_c: number;
                mintemp_c: number;
            };
        }[];
    };
}

export default function Home() {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [inputText, setInputText] = useState<string>("");
    // const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    const fetchData = async (city: string) => {
        const options = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
            params: {
                q: city,
                days: '3'
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_WEATHER_API_KEY,
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setWeatherData(response.data);
            // setError(null);
        } catch (error) {
            // setError('Failed to fetch weather data. Please try again.');
        }
    };
    const handleSearch = () => {
        if (inputText.trim() !== '') {
            fetchData(inputText);
        } else {
            // setError('Please enter a valid city name.');
        }
    };
    useEffect(() => {
        fetchData('noisy-le-grand');
    }, []);
    
    return (
        <div>
            <SpeedInsights/>
            <Header/>
            <div className='containerHome'>
                <div className='inputSearch'>
                    <input type="text" name="textInput" placeholder='Entry the city...' onChange={(e)=>setInputText(e.target.value)}/>
                    <button onClick={handleSearch}>Search</button>
                </div>
                {weatherData ? (
                    <div className='containerWeather'>
                        <h2>Weather Forecast for {weatherData.location.name}</h2>
                        <div className='detailsWeather'>
                            {weatherData.forecast.forecastday.map(day => (
                                <div key={day.date}>
                                    <h3>{day.date}</h3>
                                    <p>Sunrise:{day.astro.sunrise}</p>
                                    <p>Moon_phase:{day.astro.moon_phase}</p>
                                    <p>Condition: {day.day.condition.text}</p>
                                    <p>Max Temp: {day.day.maxtemp_c}°C</p>
                                    <p>Min Temp: {day.day.mintemp_c}°C</p>
                                    <img src={day.day.condition.icon} alt={day.day.condition.text} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}
