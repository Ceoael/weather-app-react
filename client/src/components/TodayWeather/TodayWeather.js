import React from 'react';
import {useSelector} from 'react-redux';

import classes from './TodayWeather.module.css';

import Toolbar from './Toolbar/Toolbar';

const TodayWeather = ({showNavigationHandler}) => {
    const temperature = useSelector((store) => store.weatherStore.weatherForecast['consolidated_weather'][0].the_temp);
    const weatherState = useSelector((store) => store.weatherStore.weatherForecast['consolidated_weather'][0].weather_state_name);
    const localization = useSelector((store) => store.weatherStore.currentCity);
    const todayDate = useSelector((store) => store.weatherStore.weatherForecast['consolidated_weather'][0].applicable_date);

    function formattedDate(date) {
        const [dayName, day, month] = new Date(date).toUTCString().split(' ');
        return `${dayName} ${day} ${month}`;
    }

    return (
        <section className={classes.todayWeatherWrapper}>
            <Toolbar showNavigationHandler={showNavigationHandler}/>
            <div className={classes.todayWeather}>
                <img className={classes.todayWeather__image} src={`/img/${weatherState.replace(/\s/g, '')}.png`} alt='weather'/>
                <div className={classes.todayWeather__temperature}>{ Math.floor(temperature) }
                    <span className={classes.todayWeather__degree}>&#8451;</span>
                </div>
                <div className={classes.todayWeather__description}>{ weatherState }</div>
                <div className={classes.todayWeather__date}>Today<span className={classes.todayWeather__dot}>•</span>{ formattedDate(todayDate) }</div>
                <div className={classes.todayWeather__localization}>
                    <span className={`material-icons ${classes.todayWeather__placeIcon}`}>place</span>
                    { localization }
                </div>
            </div>
        </section>
    )
}

export default TodayWeather;
