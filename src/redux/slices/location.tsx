import {createSlice} from "@reduxjs/toolkit";

// helpers
import {addNotification} from "src/utils/helpers";
import {Forecast, ErrorObject} from "src/utils/interfaces";

// redux
import {fetchForecastData} from "../actions/fetchForecastData";

type LocationState = {
    loading: boolean;
    error: null | ErrorObject;
    location: null | Forecast;
};

const initialState = {
    location: null,
    error: null,
    loading: false
} as LocationState;

const locationSlice = createSlice({
    name: "location",
    initialState: initialState,
    reducers: {
        clearForecastData: (state) => {
            state.location = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchForecastData.pending, (state) => {
            state.error = null;
            state.loading = true;
        });
        builder.addCase(fetchForecastData.fulfilled, (state, {payload}) => {
            state.location = payload;
            state.loading = false;
        });
        builder.addCase(fetchForecastData.rejected, (state, {payload}) => {
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

export const locationReducer = locationSlice.reducer;
export const {clearForecastData} = locationSlice.actions;
