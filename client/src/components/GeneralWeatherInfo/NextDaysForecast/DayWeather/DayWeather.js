import React from 'react';

import classes from './DayWeather.module.css';

const DayWeather = ({date, imageName, dayTemperature, nightTemperature}) => {
    return (
        <div className={classes.forecastElement__wrapper}>
            <div className={classes.forecastElement}>
                <h2 className={classes.forecastElement__date}>{date}</h2>
                <img className={classes.forecastElement__image} src={`/img/${imageName}.png`} alt={imageName}/>
                <div className={classes.forecastElement__temperatures}>
                    <p>{dayTemperature}°C</p>
                    <p className={classes['forecastElement__temperatures--night']}>{nightTemperature}°C</p>
                </div>
            </div>
        </div>
    )
}

export default DayWeather;
