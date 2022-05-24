import React, {FC, useContext, useEffect} from "react";

// components
import App from "./App";

// helpers
import {
    fetchCityNamesByCoordinates,
    getCurrentLocation,
    getLocationsFromStorage,
    isLocationExistInStorage
} from "./utils/helpers";
import {useAppDispatch} from "./utils/hooks";
import {Coordinates} from "./utils/interfaces";
import {ModalContext} from "./utils/contexts";

// redux
import {fetchCurrentWeatherMultiple} from "./redux/actions/fetchCurrentWeatherMultiple";
import {fetchCurrentWeather} from "./redux/actions/fetchCurrentWeather";

const AppContainer: FC = () => {
    const dispatch = useAppDispatch();
    const {openModal} = useContext(ModalContext);

    useEffect(() => {
        console.log("useEffect!!!!!");
        const locationsFromStorage = getLocationsFromStorage();
        if (locationsFromStorage.length) {
            dispatch(fetchCurrentWeatherMultiple(locationsFromStorage));
        }
        getCurrentLocation(checkCurrentCity);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkCurrentCity = async (options: Coordinates) => {
        const currentLocationNames = await fetchCityNamesByCoordinates(options);
        if (currentLocationNames.length) {
            const firstMatch = currentLocationNames[0];
            const {lon, lat} = firstMatch;
            if (isLocationExistInStorage({lon, lat})) return;
            openModal({
                location: firstMatch,
                fetchLocation: (coord: Coordinates) => dispatch(fetchCurrentWeather(coord))
            });
        }
    };

    return (
        <>
            <App />
        </>
    );
};

export default AppContainer;
