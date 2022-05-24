import {Store} from "react-notifications-component";
import {countries} from "country-data";

// helpers
import {
    CityName,
    CityNameOption,
    Coordinates,
    ForecastList,
    OptionForChart,
    Weather
} from "./interfaces";
import openWeatherAPI from "../api/openWeatherAPI";

// OPTIONS FOR REACT SELECT

export const generateCityNameOption = (item: CityName): CityNameOption => {
    const labelArray = [item.name];
    const countryName = getCountryNameByCode(item.country);
    countryName && labelArray.push(countryName);
    item.state && labelArray.push(item.state);
    return {
        ...item,
        label: labelArray.join(", ")
    };
};

export const generateCityNameOptions = (items: CityName[]): CityNameOption[] => {
    return items.map((item) => generateCityNameOption(item));
};

// MATH

export const average = (arr: number[]): number =>
    Math.round(arr.reduce((p, c) => p + c, 0) / arr.length);

export const numberToFixedDecimalPoint = (number: number, point: number): number =>
    Number(number.toFixed(point));

// STRINGS

export const capitalize = (s: string): string => s && s[0].toUpperCase() + s.slice(1);

// TIME

export const convertUnixTime = (unixUtc: number): Date => {
    return new Date(unixUtc * 1000);
};

export const convertUnixTimeToDate = (unixUtc: number): string => {
    return convertUnixTime(unixUtc).toLocaleDateString();
};

export const convertUnixTimeToTime = (unixUtc: number): string => {
    return convertUnixTime(unixUtc).toLocaleTimeString();
};

export const getWeekDayFromtUnixTime = (unixUtc: number): string => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[convertUnixTime(unixUtc).getDay()];
};

// TEMPERATURE

export const convertTempretureKelvinToC = (temp: number): number => Math.round(temp);

// COUNTRIES

export const getCountryNameByCode = (code: string): string | undefined => countries[code]?.name;

// WEATHER HELPERS

export const fetchCityNames = async (query: string) => {
    try {
        const data = await openWeatherAPI.fetchCityNames(query);
        return generateCityNameOptions(data) as CityNameOption[];
    } catch (error) {
        addNotification({
            title: "Oops!",
            message: error.response.data ? error.response.data.message : error.message
        });
    }
};

export const fetchCityNamesByCoordinates = async (options: Coordinates) => {
    try {
        const data = await openWeatherAPI.fetchCityNamesByCoordinates(options);
        return data as CityName[];
    } catch (error) {
        addNotification({
            title: "Oops!",
            message: error.response.data ? error.response.data.message : error.message
        });
    }
};

// LOCAL STORAGE

export const setLocationsInStorage = (locations: Weather[]): void => {
    const arrayCoords = locations.map((loc) => loc.coord);
    const stringifyUsers = JSON.stringify(arrayCoords);
    localStorage.setItem("locations", stringifyUsers);
};

export const getLocationsFromStorage = (): Coordinates[] => {
    const arrayCoords = localStorage.getItem("locations");
    if (!arrayCoords) return [];
    const parsedArrayCoords = JSON.parse(arrayCoords);
    return parsedArrayCoords;
};

export const isLocationExistInStorage = (coord: Coordinates): boolean => {
    const arrayCoords = getLocationsFromStorage();
    if (!arrayCoords.length) return false;
    const {lon, lat} = coord;
    const existedCoords = arrayCoords.find(
        (item) =>
            numberToFixedDecimalPoint(item.lon, 3) === numberToFixedDecimalPoint(lon, 3) &&
            numberToFixedDecimalPoint(item.lat, 3) === numberToFixedDecimalPoint(lat, 3)
    );
    return existedCoords ? true : false;
};

// CHARTS

export const getSortedForecastArrayByDate = (list: ForecastList[]): ForecastList[][] => {
    const resultArray = list.reduce((acc, item) => {
        const currentItemDate = convertUnixTimeToDate(item.dt);
        const existDate = acc.find((a) => convertUnixTimeToDate(a[0].dt) === currentItemDate);
        if (existDate) {
            const newAcc = acc.map((a) =>
                convertUnixTimeToDate(a[0].dt) === currentItemDate ? [...a, item] : a
            );
            return newAcc;
        }
        acc.push([item]);
        return acc;
    }, []);
    return resultArray;
};

export const getOptionForChart = (item: ForecastList): OptionForChart => {
    const date = convertUnixTimeToDate(item.dt);
    const time = convertUnixTimeToTime(item.dt);
    const weekDay = getWeekDayFromtUnixTime(item.dt);
    const temperature = convertTempretureKelvinToC(item.main.temp);

    const result = {
        date,
        time,
        weekDay,
        temperature
    };
    return result;
};

export const getOptionsForChart = (array: ForecastList[]): OptionForChart[] =>
    array.map((item) => getOptionForChart(item));

export const getOptionForChartWithAverageTemperature = (array: ForecastList[]): OptionForChart => {
    const data = getOptionForChart(array[0]);
    const averageTemperature = average(
        array.map((item) => convertTempretureKelvinToC(item.main.temp))
    );
    const result = {
        ...data,
        temperature: averageTemperature
    };
    return result;
};

export const getOptionsForChartWithAverageTemperature = (
    array: ForecastList[][]
): OptionForChart[] => array.map((arr) => getOptionForChartWithAverageTemperature(arr));

// GEOLOCATION POSITION

export const getCurrentLocation = (checkCurrentCity: (options: Coordinates) => void) => {
    const success = (pos: GeolocationPosition) => {
        const crd = pos.coords;
        checkCurrentCity({lat: crd.latitude, lon: crd.longitude});
    };

    navigator.geolocation.getCurrentPosition(success);
};

// NOTIFICATIONS

export const addNotification = ({title = "", message = ""}) => {
    Store.addNotification({
        title: title,
        message: capitalize(message),
        type: "danger",
        insert: "bottom",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 4000
        },
        slidingEnter: {
            duration: 800,
            timingFunction: "ease-out",
            delay: 0
        },
        slidingExit: {
            duration: 800,
            timingFunction: "ease-out",
            delay: 0
        }
    });
};
