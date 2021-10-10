import { configureStore } from '@reduxjs/toolkit';
import spotifyReducer from './spotifySlice';

const store = configureStore({
    reducer: {
        spotify: spotifyReducer,
    },
});

export default store;
