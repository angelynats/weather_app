import React, {FC, useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";

// components
import LocationForecastDateList from "components/LocationForecast/LocationForecastDateList";
import LocationForecastChartList from "components/LocationForecast/LocationForecastChartList";
import Loader from "components/Loader/Loader";

// helpers
import {useAppDispatch, useAppSelector} from "../../utils/hooks";
import {
    getCountryNameByCode,
    getOptionsForChart,
    getOptionsForChartWithAverageTemperature,
    getSortedForecastArrayByDate
} from "src/utils/helpers";

// redux
import {fetchForecastData} from "src/redux/actions/fetchForecastData";
import {clearForecastData} from "src/redux/slices/location";

// styles
import {Container, Typography} from "@mui/material";

const LocationPage: FC = () => {
    const [detailsIndex, setdetailsIndex] = useState(null);

    const dispatch = useAppDispatch();
    const {id} = useParams();
    const {location, loading} = useAppSelector((state) => state.locationReducer);

    const {city, list} = location || {};
    const countryName = city && getCountryNameByCode(city.country);

    useEffect(() => {
        dispatch(fetchForecastData(id));
        return () => {
            dispatch(clearForecastData());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const sortedForecastArrayByDate = useMemo(
        () => list && getSortedForecastArrayByDate(list),
        [list]
    );

    const optionsForChartWithAverageTemperature = useMemo(
        () =>
            sortedForecastArrayByDate &&
            getOptionsForChartWithAverageTemperature(sortedForecastArrayByDate),
        [sortedForecastArrayByDate]
    );

    const optionsForChart = useMemo(
        () =>
            detailsIndex === null
                ? null
                : getOptionsForChart(sortedForecastArrayByDate[detailsIndex]),
        [detailsIndex, sortedForecastArrayByDate]
    );

    const handleSelectDate = (index: number) => {
        if (index === detailsIndex) {
            setdetailsIndex(null);
        } else {
            setdetailsIndex(index);
        }
    };

    // if (loading) return <Loader />;

    return (
        <Container maxWidth="lg">
            <Typography
                variant="h5"
                component="h1"
                color="text.secondary"
                align="center"
                mt={3}
                mb={3}
            >
                Location Details
            </Typography>
            {!location && (
                <Typography variant="h6" color="text.secondary" align="center">
                    No result
                </Typography>
            )}
            {location && (
                <>
                    <Typography variant="h5" color="text.secondary" align="center" mb={3}>
                        {countryName ? `${city.name}, ${countryName}` : city.name}
                    </Typography>
                    <LocationForecastDateList
                        options={optionsForChartWithAverageTemperature}
                        onSelectDate={handleSelectDate}
                        selectedIndex={detailsIndex}
                    />
                    {optionsForChart && <LocationForecastChartList options={optionsForChart} />}
                </>
            )}
        </Container>
    );
};

export default LocationPage;
