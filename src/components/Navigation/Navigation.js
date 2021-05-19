import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import classes from './Navigation.module.css';

import {weatherActions, getWeather, getAvailablePlaces} from './../../store/weatherSlice';


const Navigation = ({show, showNavigationHandler}) => {
    const dispatch = useDispatch();

    const places = useSelector(state => state.weatherStore.availablePlaces);
    const error = useSelector(state => state.weatherStore.error);

    const [placeName, setPlaceName] = useState('');

    const closeNav = () => {
        showNavigationHandler(false);
        setPlaceName('');
    }

    const selectedCityHandler = (woeid) => {
        closeNav();
        dispatch(weatherActions.setLoading({loading: true}));
        dispatch(getWeather({location: woeid}));
    }

    const searchHandler = () => {
        if (!placeName) return;

        const formattedName = encodeURI(placeName);
        dispatch(getAvailablePlaces({name: formattedName}));
    }

    return (
        <nav className={[classes.navigation, (show ? classes['navigation--show'] : null)].join(' ')}>
            <div className={classes.navigation__close}>
                <button className={classes.closeButton} onClick={closeNav}>
                    <span className={['material-icons', classes.closeButton__icon].join(' ')}>close</span>
                </button>
            </div>

            <div className={classes.searchBar}>
            <div className={classes.searchBar__searchBox}>
                <span className={['material-icons', classes.searchBar__icon].join(' ')}>search</span>
                <input className={classes.searchBar__input} placeholder="search location" value={placeName} onChange={(e) => setPlaceName(e.target.value)}/>
            </div>
                <button className={classes.searchBar__button} onClick={searchHandler}>Search</button>
            </div>
            <div className={classes.error}>
                { error }
            </div>

            {places.map((place) => (
                <button className={classes.place}
                    key={place.woeid}
                    onClick={() => selectedCityHandler(place.woeid)}
                >
                    <p className={classes.place__name}>{place.title}</p>
                    <span className={['material-icons', classes.place__icon].join(' ')}>chevron_right</span>
                </button>
            ))}

        </nav>
    )
}

export default Navigation;
