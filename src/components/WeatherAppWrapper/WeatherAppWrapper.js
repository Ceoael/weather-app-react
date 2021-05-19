import React from 'react';

import classes from './WeatherAppWrapper.module.css';

const WeatherAppWrapper = ({children}) => {
    return (
        <main className={classes['weather-app']}>
            {children}
        </main>
    )
}

export default WeatherAppWrapper;
