import React from 'react';
import { useSelector } from 'react-redux';

import classes from './WeatherParameters.module.css';

import WeatherParameter from './WeatherParameter/WeatherParameter';

const WeatherParameters = () => {
    const windSpeed = useSelector(store => store.weatherStore.weatherForecast.consolidated_weather[0].wind_speed);
    const windDirection = useSelector(store => store.weatherStore.weatherForecast.consolidated_weather[0].wind_direction_compass);
    const humidity = useSelector(store => store.weatherStore.weatherForecast.consolidated_weather[0].humidity);
    const visibility = useSelector(store => store.weatherStore.weatherForecast.consolidated_weather[0].visibility);
    const airPressure = useSelector(store => store.weatherStore.weatherForecast.consolidated_weather[0].air_pressure);

    return (
        <section className={classes.WeatherParameters}>
            <h1 className={classes.WeatherParameters__header}>Today's Hightlights</h1>
            <WeatherParameter 
                name="Wind status"
                value={Math.floor(windSpeed)}
                unit="mph">{windDirection}</WeatherParameter>
            <WeatherParameter 
                name="Humidity"
                value={humidity}
                unit="%" />
            <WeatherParameter 
                name="Visibility"
                value={Math.floor(visibility)}
                unit=" miles" />
             <WeatherParameter 
                name="Air Pressure"
                value={airPressure}
                unit=" mb" />
        </section>
    )
}

export default WeatherParameters;