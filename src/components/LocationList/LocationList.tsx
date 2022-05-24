import React, {FC} from "react";
import {useNavigate} from "react-router-dom";

// components
import LocationListItem from "./LocationListItem";

// helpers
import {useAppDispatch, useAppSelector} from "src/utils/hooks";
import {deleteLocation} from "src/redux/slices/locations";
import {Coordinates, LocationId} from "src/utils/interfaces";

// redux
import {fetchCurrentWeather} from "src/redux/actions/fetchCurrentWeather";

// styles
import {Box, Typography} from "@mui/material";

const LocationList: FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {locations, loading} = useAppSelector((state) => state.locationsReducer);

    const handleSelectLocation = (id: LocationId) => {
        navigate(`/location/${id}`);
    };

    const handleDeleteLocation = (e: React.MouseEvent, id: LocationId) => {
        e.stopPropagation();
        dispatch(deleteLocation(id));
    };

    const handleUpdateLocation = (e: React.MouseEvent, coord: Coordinates) => {
        e.stopPropagation();
        dispatch(fetchCurrentWeather(coord));
    };

    return (
        <>
            <Typography variant="h5" color="text.secondary" align="center" mb={2}>
                My locations
            </Typography>
            {!locations.length && !loading ? (
                <Typography variant="h6" color="text.secondary" align="center" my={2}>
                    No selected locations
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "flex-start"
                    }}
                >
                    {locations.map((location) => (
                        <LocationListItem
                            key={location.id}
                            location={location}
                            onDeleteLocation={handleDeleteLocation}
                            onSelectLocation={handleSelectLocation}
                            onUpdateLocation={handleUpdateLocation}
                        />
                    ))}
                </Box>
            )}
        </>
    );
};

export default LocationList;
