import axios from "axios";

// helpers
import {
    OPEN_WEATHER_API_KEY,
    OPEN_WEATHER_API_URL,
    OPEN_WEATHER_CUSTOM_URL,
    REQUEST_LIMIT
} from "../utils/constants";
import {Coordinates} from "../utils/interfaces";

const openWeatherAPIInstance = axios.create({
    baseURL: OPEN_WEATHER_API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

const openWeatherAPI = {
    limit: REQUEST_LIMIT,
    apiKey: OPEN_WEATHER_API_KEY,

    async fetchCityNames(query: string) {
        const queryString = `/geo/1.0/direct?q=${query}&limit=${this.limit}&appid=${this.apiKey}&units=metric`;
        const {data} = await openWeatherAPIInstance.get(queryString);
        return data;
    },

    async fetchCityNamesByCoordinates(options: Coordinates) {
        const {lat, lon} = options;
        const queryString = `/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${this.limit}&appid=${this.apiKey}&units=metric`;
        const {data} = await openWeatherAPIInstance.get(queryString);
        return data;
    },

    async fetchCurrentWeather(options: Coordinates) {
        const {lat, lon} = options;
        const queryString = `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
        const {data} = await openWeatherAPIInstance.get(queryString);
        return data;
    },

    async fetchForecastData(id: string) {
        const queryString = `/data/2.5/forecast?id=${id}&appid=${this.apiKey}&units=metric`;
        const {data} = await openWeatherAPIInstance.get(queryString);
        return data;
    },

    getIconUrl(code: string): string {
        return `${OPEN_WEATHER_CUSTOM_URL}/img/wn/${code}@4x.png`;
    }
};

export default openWeatherAPI;
