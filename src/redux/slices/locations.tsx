import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// helpers
import {setLocationsInStorage, addNotification} from "src/utils/helpers";
import {LocationId, Weather, ErrorObject} from "src/utils/interfaces";

// redux
import {fetchCurrentWeather} from "../actions/fetchCurrentWeather";
import {fetchCurrentWeatherMultiple} from "../actions/fetchCurrentWeatherMultiple";

type LocationsState = {
    loading: boolean;
    error: null | ErrorObject;
    locations: Weather[];
};

const initialState = {
    locations: [],
    error: null,
    loading: false
} as LocationsState;

const locationsSlice = createSlice({
    name: "locations",
    initialState: initialState,
    reducers: {
        deleteLocation: (state, {payload}: PayloadAction<LocationId>) => {
            state.locations = state.locations.filter((s) => s.id !== payload);
            setLocationsInStorage(state.locations);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentWeather.pending, (state) => {
            state.error = null;
        });
        builder.addCase(fetchCurrentWeather.fulfilled, (state, {payload}) => {
            const existLocation = state.locations.find((l) => l.id === payload.id);
            if (existLocation) {
                state.locations = state.locations.map((l) => (l.id === payload.id ? payload : l));
                return;
            }
            state.locations = [payload, ...state.locations];
            setLocationsInStorage(state.locations);
        });
        builder.addCase(fetchCurrentWeather.rejected, (state, {payload}) => {
            console.log("fetchCurrentWeather.rejected", payload);
            state.error = payload;
            state.error.message &&
                addNotification({
                    title: "Oops!",
                    message: state.error.message
                });
        });

        builder.addCase(fetchCurrentWeatherMultiple.pending, (state) => {
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchCurrentWeatherMultiple.fulfilled, (state, {payload}) => {
            state.locations = payload;
            state.loading = false;
        });
        builder.addCase(fetchCurrentWeatherMultiple.rejected, (state, {payload}) => {
            console.log("fetchCurrentWeatherMultiple.rejected", payload);
            state.error = payload;
            state.loading = false;
            state.error.message &&
                addNotification({
                    title: "Oops!",
                    message: state.error.message
                });
        });
    }
});

export const locationsReducer = locationsSlice.reducer;
export const {deleteLocation} = locationsSlice.actions;
