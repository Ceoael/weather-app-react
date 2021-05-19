import React from 'react';
import { useSelector } from 'react-redux';

import classes from './NextDaysForecast.module.css';

import DayWeather from './DayWeather/DayWeather';

const NextDaysForecast = () => {
    const weatherForecast = useSelector(store => store.weatherStore.weatherForecast.consolidated_weather.slice(1))

    function formattedDate(date) {
        const [dayName, day, month] = new Date(date).toUTCString().split(' ');
        return `${dayName} ${day} ${month}`;
    }

    return (
        <section className={classes.nextDaysForecast}>
            {weatherForecast.map((day, index) => (
                <DayWeather 
                    key={day.id}
                    date={index === 0 ? 'Tommorow' : formattedDate(day.applicable_date)}
                    imageName={day.weather_state_name.replace(/\s/g, '')}
                    nightTemperature={Math.floor(day.min_temp)}
                    dayTemperature={Math.floor(day.the_temp)}/>
            ))}
        </section>
    )
}

export default NextDaysForecast;
