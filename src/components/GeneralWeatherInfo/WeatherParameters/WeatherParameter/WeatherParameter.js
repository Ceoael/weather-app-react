import React from 'react';

import classes from './WeatherParameter.module.css';

const WeatherParameter = ({name, value, unit, children}) => {
    return (
        <div className={classes.weatherParameter}>
            <h2 className={classes.weatherParameter__header}>{name}</h2>
            <p className={classes.weatherParameter__value}>{value}<span className={classes['weatherParameter__value--unit']}>{ unit }</span></p>
            { children ? (<div className={classes.weatherParameter__additionalData}>{children}</div>) : null}
        </div>
    )
}

export default WeatherParameter;
