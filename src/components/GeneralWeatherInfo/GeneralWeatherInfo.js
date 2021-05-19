import React from 'react';

import classes from './GeneralWeatherInfo.module.css';

import NextDaysForecast from './NextDaysForecast/NextDaysForecast';
import WeatherParameters from './WeatherParameters/WeatherParameters';

const GeneralWeatherInfo = () => {
    return (
        <section className={classes.generalWeatherInfo}>
            <NextDaysForecast />
            <WeatherParameters />
            <footer className={classes.footer}>created by <a className={classes.footer_link} href="https://github.com/ceoael">ceoael</a> - devChallenges.io</footer>
        </section>
    )
}

export default GeneralWeatherInfo;
