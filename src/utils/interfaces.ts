export type LocationId = number;

export type ErrorObject = {message?: string; cod?: string};

export interface CityName {
    name: string;
    country: string;
    local_names: {[key: string]: string};
    lon: number;
    lat: number;
    state?: string;
}

export interface CityNameOption extends CityName {
    label: string;
}

export interface NumbersObject {
    [key: string]: number;
}

export interface StringsObject {
    [key: string]: string;
}

export interface Coordinates {
    lon: number;
    lat: number;
}

export interface WeatherConditions {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface SystemData {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface Weather {
    coord: Coordinates;
    weather: WeatherConditions[];
    base: string;
    main: NumbersObject;
    visibility: number;
    wind: NumbersObject;
    clouds: NumbersObject;
    dt: number;
    sys: SystemData;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface CityData {
    id: number;
    name: string;
    coord: Coordinates;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}

export interface ForecastList {
    id?: number;
    main: NumbersObject;
    weather: WeatherConditions[];
    clouds: NumbersObject;
    wind: NumbersObject;
    visibility: number;
    pop: number;
    sys: StringsObject;
    dt_txt: string;
    dt: number;
}

export interface Forecast {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastList[];
    city: CityData;
}

export interface OptionForChart {
    date: string;
    time: string;
    temperature: number;
    weekDay: string;
}

export interface ModalLocationConfig {
    location: CityName;
    fetchLocation: (coord: Coordinates) => void;
}
