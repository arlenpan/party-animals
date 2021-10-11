import { createSlice } from '@reduxjs/toolkit';

export const spotifySlice = createSlice({
    name: 'spotify',
    initialState: {
        accessToken: null,
        deviceId: null,
        player: null,
    },
    reducers: {
        updateToken: (state, action) => {
            state.accessToken = action.payload;
        },
        updateDeviceId: (state, action) => {
            state.deviceId = action.payload;
        },
    },
});

export const { updateToken, updateDeviceId } = spotifySlice.actions;
export default spotifySlice.reducer;
