import React, {FC, useCallback} from "react";

// helpers
import AsyncSelect from "react-select/async";
import {debounce} from "lodash";
import {DEBOUNCE_DELAY} from "src/utils/constants";
import {fetchCityNames} from "src/utils/helpers";
import {CityNameOption} from "src/utils/interfaces";
import {useAppDispatch} from "src/utils/hooks";

// redux
import {fetchCurrentWeather} from "src/redux/actions/fetchCurrentWeather";

// styles
import {Box, Typography} from "@mui/material";

const LocationSearch: FC = () => {
    const dispatch = useAppDispatch();

    const handleSelectCity = (e: CityNameOption) => {
        if (!e) return;
        const {lat, lon} = e;
        dispatch(fetchCurrentWeather({lat, lon}));
    };

    const fetchCities = useCallback(
        (inputValue: string, callback: (options: CityNameOption[]) => void): void => {
            fetchCityNames(inputValue).then((options) => {
                callback(options);
            });
        },
        []
    );

    const loadOptions = debounce(fetchCities, DEBOUNCE_DELAY);

    return (
        <Box sx={{maxWidth: 500}} mb={4} mt={3} mx={"auto"}>
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                onChange={handleSelectCity}
                placeholder={
                    <Typography variant="body1" color="text.secondary">
                        Choose a location...
                    </Typography>
                }
                value={null}
                isClearable
                isSearchable
                noOptionsMessage={() => (
                    <Typography variant="body1" color="text.secondary">
                        No results
                    </Typography>
                )}
                components={{
                    IndicatorSeparator: () => null
                }}
                styles={{
                    container: (base) => ({
                        ...base
                    }),
                    control: (base) => ({
                        ...base,
                        height: "45px",
                        padding: "0 0 0 16px",
                        boxShadow: "none",
                        border: "1px solid rgb(206, 212, 218)",
                        "&:hover": {
                            border: "1px solid rgb(206, 212, 218)"
                        }
                    }),
                    placeholder: (base) => ({
                        ...base,
                        padding: 0,
                        margin: 0
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        padding: 0,
                        height: "45px"
                    }),
                    input: (base) => ({
                        ...base,
                        padding: 0,
                        margin: 0,
                        height: "45px"
                    }),
                    menu: (base) => ({
                        ...base,
                        marginTop: 0
                    })
                }}
            />
        </Box>
    );
};

export default LocationSearch;
