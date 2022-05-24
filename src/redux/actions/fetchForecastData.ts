import {createAsyncThunk} from "@reduxjs/toolkit";

// helpers
import {Forecast} from "src/utils/interfaces";
import openWeatherAPI from "src/api/openWeatherAPI";

export const fetchForecastData = createAsyncThunk(
    "location/fetchForecastData",
    async (id: string, thunkApi) => {
        try {
            const data = await openWeatherAPI.fetchForecastData(id);
            return data as Forecast;
        } catch (error) {
            if (error.response.status === 404) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            return thunkApi.rejectWithValue({message: error.message});
        }
    }
);
