import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {weatherActions} from './../../store/weatherSlice';
import {getWeather} from './../../store/weatherSlice';

import WeatherAppWrapper from './../../components/WeatherAppWrapper/WeatherAppWrapper';
import Backdrop from '../../components/Backdrop/Backdrop';
import Spinner from './../../components/Spinner/Spinner';
import TodayWeather from './../../components/TodayWeather/TodayWeather';
import Navigation from './../../components/Navigation/Navigation';
import GeneralWeatherInfo from './../../components/GeneralWeatherInfo/GeneralWeatherInfo';

const WeatherAppBuilder = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.weatherStore.loading);
    const [showNavigation, setShowNavigation] = useState(false);

    const showNavigationHandler = (bValue) => {
        setShowNavigation(bValue);
    };

    useEffect(() => {
        dispatch(weatherActions.setLoading({loading: true}));
        dispatch(getWeather({location: 44418}));
    }, [dispatch])

    return (
        <WeatherAppWrapper>
            <Backdrop show={loading}>
                <Spinner />
            </Backdrop>
            
            <Navigation show={showNavigation} showNavigationHandler={showNavigationHandler}/>
            <TodayWeather showNavigationHandler={showNavigationHandler}/>
            <GeneralWeatherInfo />
        </WeatherAppWrapper>
    )
}

export default WeatherAppBuilder;
