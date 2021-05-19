import React from 'react';
import { useDispatch } from 'react-redux';

import { weatherActions } from './../../../store/weatherSlice';
import { getWeather } from './../../../store/weatherSlice';

import classes from './Toolbar.module.css';

const Toolbar = ({showNavigationHandler}) => {
    const dispatch = useDispatch();

    const getClosestCity = () => {
        const getPosition = () => {
            dispatch(weatherActions.setLoading({loading: true}));
            return new Promise((resolve, reject) => 
                navigator.geolocation.getCurrentPosition(resolve, reject));
        }

        if (!navigator.geolocation) {
            return
        } else {
            getPosition()
                .then((position) => {
                    const userLocation = `lattlong=${position.coords.latitude},${position.coords.longitude}`;
                    fetch(`http://localhost:4000/weather/search?${userLocation}`)
                        .then( res => res.json())
                        .then( data => {
                            dispatch(getWeather({location: data[0].woeid}));
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log('Couldn\'t get location');
                    console.log(err);
                })
        }
    };


    return (
        <div className={classes.toolbar}>
            <button className={classes.toolbar__searchButton} onClick={() => showNavigationHandler(true)}>Search for places</button>
            <button className={classes.toolbar__circleButton} onClick={getClosestCity}>
                <span className={`material-icons ${classes.toolbar__locationIcon}`}>my_location</span>
            </button>
        </div>
    )
}

export default Toolbar;