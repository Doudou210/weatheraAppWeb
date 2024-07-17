export interface WeatherData {
    location: {
        name: string;
    };
    forecast: {
        forecastday: ForecastDay[];
    };
}

export interface ForecastDay {
    date: string;
    day: {
        condition: {
            text: string;
            icon: string;
        };
        maxtemp_c: number;
        mintemp_c: number;
    };
}
