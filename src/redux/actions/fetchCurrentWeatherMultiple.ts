import {createAsyncThunk} from "@reduxjs/toolkit";

// helpers
import {Coordinates, Weather} from "src/utils/interfaces";
import openWeatherAPI from "src/api/openWeatherAPI";

export const fetchCurrentWeatherMultiple = createAsyncThunk(
    "locations/fetchCurrentWeatherMultiple",
    async (options: Coordinates[], thunkApi) => {
        return Promise.all(options.map((option) => openWeatherAPI.fetchCurrentWeather(option)))
            .then((locations) => {
                return locations as Weather[];
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    return thunkApi.rejectWithValue(error.response.data);
                }
                return thunkApi.rejectWithValue({message: error.message});
            });
    }
);
