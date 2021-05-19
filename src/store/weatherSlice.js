import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: '',
    availablePlaces: [{
        title:"London",
        location_type:"City",
        woeid:44418,
        latt_long:"51.506321,-0.12714"
    },
    {
        title:"Barcelona",
        location_type:"City",
        woeid:753692,
        latt_long:"41.385578,2.168740"
    },
    {
        title:"Long Beach",
        location_type:"City",
        woeid:2441472,
        latt_long:"33.766720,-118.192398"
    }],
    loading: false,
    woeid: 44418,
    currentCity: 'London',
    weatherForecast: 
        {
            consolidated_weather:[
            {
                id: 0,
                weather_state_name:"",
                wind_direction_compass:"",
                applicable_date:"",
                min_temp:0,
                max_temp:0,
                the_temp:0,
                wind_speed:0,
                wind_direction:0,
                air_pressure:0,
                humidity:0,
                visibility:0,
            }]
        }
};

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setLoading(state, action){
            state.loading = action.payload.loading;
        },
        saveUserWoeid(state, action) {
            state.woeid = action.payload.woeid;
        },
        saveCurrentCity(state, action) {
            state.currentCity = action.payload.currentCity;
        },
        saveWeatherForecast(state, action) {
            state.weatherForecast = action.payload.weatherForecast;
        },
        setAvailablePlaces(state, action) {
            state.availablePlaces = action.payload.places;
        },
        setError(state, action) {
            state.error = action.payload.message;
        }
    }
})

export const getWeather = (payload) => {
    return async (dispatch) => {
        fetch(`http://localhost:4000/weather?woeid=${payload.location}`)
            .then (res => res.json())
            .then (data => {
                const {title} = data;
                dispatch(weatherSlice.actions.saveCurrentCity({currentCity: title}));
                dispatch(weatherSlice.actions.saveWeatherForecast({weatherForecast: data}))
                dispatch(weatherSlice.actions.setLoading({loading: false}));
                dispatch(weatherSlice.actions.setError({message: ''}));
            })
            .catch ((err) => {
                console.log(err);

                dispatch(weatherSlice.actions.setError({message: 'Connection problem'}));
                dispatch(weatherSlice.actions.setLoading({loading: false}));
            })
    }
}

export const getAvailablePlaces = (payload) => {
    return async (dispatch) => {
        dispatch(weatherSlice.actions.setLoading({loading: true}));

        fetch(`http://localhost:4000/weather/search?query=${payload.name}`)
            .then( res => res.json())
            .then( data => {
                if (Array.isArray(data) && !data.length) {
                    dispatch(weatherSlice.actions.setError({message: 'Weather forecast for this location is unavailable.'}));
                    dispatch(weatherSlice.actions.setLoading({loading: false}));
                    return;
                }
                dispatch(weatherSlice.actions.setAvailablePlaces({places: data}));
                dispatch(weatherSlice.actions.setLoading({loading: false}));
                dispatch(weatherSlice.actions.setError({message: ''}));
            })
            .catch((err) => {
                console.log(err);
                
                dispatch(weatherSlice.actions.setError({message: 'Connection problem'}));
                dispatch(weatherSlice.actions.setLoading({loading: false}));
            })
        }
}

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
