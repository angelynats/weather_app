import {createAsyncThunk} from "@reduxjs/toolkit";

// helpers
import {Coordinates, Weather} from "src/utils/interfaces";
import openWeatherAPI from "src/api/openWeatherAPI";

export const fetchCurrentWeather = createAsyncThunk(
    "locations/fetchCurrentWeather",
    async (options: Coordinates, thunkApi) => {
        try {
            const data = await openWeatherAPI.fetchCurrentWeather(options);
            return data as Weather;
        } catch (error) {
            if (error.response.status === 404) {
                return thunkApi.rejectWithValue(error.response.data);
            }
            return thunkApi.rejectWithValue({message: error.message});
        }
    }
);
