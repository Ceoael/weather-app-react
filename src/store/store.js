import {configureStore} from '@reduxjs/toolkit';

import weatherSlice from './weatherSlice';

const store = configureStore({
    reducer: { weatherStore : weatherSlice }
})

export default store;